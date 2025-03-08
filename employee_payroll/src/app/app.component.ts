import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Employee {
  id?: number;
  name: string;
  department: string;
  salary: number;
  gender: string;
  startDate: string;
  profilePhoto: string;
  note: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  newEmployee: Employee = {
    name: '',
    department: '',
    salary: 0,
    gender: '',
    startDate: '',
    profilePhoto: '',
    note: ''
  };

  apiUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.http.get<Employee[]>(`${this.apiUrl}/get`).subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error loading employees:', error);
      }
    );
  }

  addEmployee(): void {
    if (!this.newEmployee.name || !this.newEmployee.department || this.newEmployee.salary <= 0) {
      alert('Please fill in all required fields!');
      return;
    }

    console.log('Adding employee:', this.newEmployee);

    this.http.post<Employee>(`${this.apiUrl}/post`, this.newEmployee).subscribe(
      () => {
        console.log('Employee added successfully');
        this.loadEmployees();
        this.resetForm();
      },
      (error) => {
        console.error('Error adding employee:', error);
      }
    );
  }

  deleteEmployee(id: number): void {
    console.log('Deleting employee with ID:', id);

    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        console.log('Employee deleted successfully');
        this.loadEmployees();
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  resetForm(): void {
    this.newEmployee = {
      name: '',
      department: '',
      salary: 0,
      gender: '',
      startDate: '',
      profilePhoto: '',
      note: ''
    };
  }
}