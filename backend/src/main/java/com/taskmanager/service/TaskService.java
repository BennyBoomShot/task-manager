package com.taskmanager.service;

import com.taskmanager.model.Task;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.model.User;
import com.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;

    public TaskService(TaskRepository taskRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userService = userService;
    }

    public Task createTask(Task task, String username) {
        User user = userService.findByUsername(username);
        task.setUser(user);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(String username) {
        User user = userService.findByUsername(username);
        return taskRepository.findByUser(user);
    }

    public Task getTaskById(Long id, String username) {
        User user = userService.findByUsername(username);
        return taskRepository.findById(id)
                .filter(task -> task.getUser().equals(user))
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task updateTask(Long id, Task taskDetails, String username) {
        Task task = getTaskById(id, username);
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setDueDate(taskDetails.getDueDate());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id, String username) {
        Task task = getTaskById(id, username);
        taskRepository.delete(task);
    }

    public List<Task> getTasksByStatus(String username, TaskStatus status) {
        User user = userService.findByUsername(username);
        return taskRepository.findByUserAndStatus(user, status);
    }
} 