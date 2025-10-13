import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface TableAction {
  icon: string;
  label: string;
  color?: 'primary' | 'accent' | 'warn';
}

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {
  // Inputs
  columns = input<TableColumn[]>([]);
  data = input<any[]>([]);
  actions = input<TableAction[]>([]);
  loading = input<boolean>(false);
  hoverable = input<boolean>(true);
  striped = input<boolean>(false);

  // Outputs
  rowClick = output<any>();
  actionClick = output<{ row: any; action: TableAction }>();
  sortChange = output<{ column: string; direction: 'asc' | 'desc' }>();

  // State
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  // Computed
  readonly hasActions = computed(() => this.actions().length > 0);
  readonly hasData = computed(() => this.data().length > 0);

  onSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({
      column: column.key,
      direction: this.sortDirection
    });
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onActionClick(row: any, action: TableAction, event: Event) {
    event.stopPropagation();
    this.actionClick.emit({ row, action });
  }

  getCellValue(row: any, key: string): any {
    return key.split('.').reduce((obj, k) => obj?.[k], row);
  }
}
