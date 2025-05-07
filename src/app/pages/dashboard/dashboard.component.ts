import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    NgForOf,
    BaseChartDirective,
    MatIconModule,
    MatButtonModule
  ]
})
export class DashboardComponent {
  userName = 'משתמש 1';
  constructor(private router: Router) {}

  goToCourses() {
    this.router.navigate(['/courses']);
  }

  getCssVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  
  gradesData: ChartData<'bar'> = {
    labels: ['ציון 1', 'ציון 2', 'ציון 3'],
    datasets: [
      {
        label: 'React',
        data: [88, 82, 91],
        backgroundColor: this.getCssVar('--color-pastel-pink')
      },
      {
        label: 'Angular',
        data: [75, 84, 80],
        backgroundColor: this.getCssVar('--color-pastel-yellow')
      },
      {
        label: 'Node.js',
        data: [90, 92, 87],
        backgroundColor: this.getCssVar('--color-pastel-purple')
      },
      {
        label: 'Vue',
        data: [78, 74, 85],
        backgroundColor: this.getCssVar('--color-secondary')
      }
    ]
  };
  

  gradesOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };
  getStatusClass(status: string): string {
    switch (status) {
      case 'הושלם': return 'status-complete';
      case 'בתהליך':
      case 'בתחילה':
      case 'בתחילך': // טעות הקלדה שראיתי
        return 'status-in-progress';
      case 'מבוטל': return 'status-cancelled';
      default: return '';
    }
  }
  courseHistory = [
    { name: 'React למתחילים', date: '10/01/2025', status: 'הושלם' },
    { name: 'Angular מתקדמים', date: '20/02/2025', status: 'בתהליך' },
    { name: 'Node.js פרקטיקה', date: '15/03/2025', status: 'הושלם' },
  ];
}
