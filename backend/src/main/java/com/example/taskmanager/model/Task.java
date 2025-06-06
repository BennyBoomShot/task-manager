package com.example.taskmanager.model;

import jakarta.persistence.*;
import lombok.Data;
import com.taskmanager.model.TaskStatus;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
}
