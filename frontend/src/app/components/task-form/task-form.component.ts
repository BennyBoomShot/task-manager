import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      status: ['TODO', Validators.required],
      dueDate: [null, [Validators.required, this.futureDateValidator()]]
    });
  }

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.taskId;
    if (this.isEditMode) {
      this.loadTask();
    }
  }

  private futureDateValidator() {
    return (control: any) => {
      const date = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date < today) {
        return { pastDate: true };
      }
      return null;
    };
  }

  loadTask() {
    if (this.taskId) {
      this.taskService.getTask(this.taskId).subscribe({
        next: (task) => {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: new Date(task.dueDate)
          });
        },
        error: (error) => {
          this.snackBar.open('Error loading task', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/tasks']);
        }
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.taskForm.value,
        dueDate: this.taskForm.value.dueDate.toISOString()
      };

      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.taskId, task).subscribe({
          next: () => {
            this.snackBar.open('Task updated successfully', 'Close', {
              duration: 3000
            });
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            this.snackBar.open('Error updating task', 'Close', {
              duration: 3000
            });
          }
        });
      } else {
        this.taskService.createTask(task).subscribe({
          next: () => {
            this.snackBar.open('Task created successfully', 'Close', {
              duration: 3000
            });
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            this.snackBar.open('Error creating task', 'Close', {
              duration: 3000
            });
          }
        });
      }
    }
  }
}
