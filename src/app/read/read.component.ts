import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PeriodicElement } from '../element.model';
import { DataService } from '../../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DiagramComponent } from '../diagram/diagram.component';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, CommonModule, DiagramComponent],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadComponent implements AfterViewInit {
  selectedRow: PeriodicElement;
  private _liveAnnouncer = inject(LiveAnnouncer);
  private dataService = inject(DataService);

  displayedColumns: string[] = [/*'id',*/ 'numberReg', 'dateReg', 'numberDoc', 'dateDoc', 'formOfDelivery', 'correspondent', 'theme', 'description', 'deadline', 'access', 'control', 'file', /*'actions'*/];
  dataSource = new MatTableDataSource<PeriodicElement>();
  pageSize = 5;
  currentPage = 0;

  constructor(private snackBar: MatSnackBar, private dataServices: DataService) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  /*ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.length = ELEMENT_DATA.length;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/

  ngAfterViewInit() {
    this.dataServices.getData().subscribe(data => {
      this.dataSource.data = data; // Загружаем данные из сервиса
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator.length = data.length;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    },
      error => {
        console.error('Ошибка при заргузке данных:', error.message || error);
        this.snackBar.open('Не удалось загрузить данные', 'Закрыть', {
          duration: 3000,
        })
      }
    );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Сортировка заканчивается на ${sortState.direction}`);
    } else {
      this._liveAnnouncer.announce('Сортировка очищена');
    }
  }
  toggleDeleteButton(element: PeriodicElement): void {
    element.showDelete = !element.showDelete; // Переключить видимость кнопки
  }
  deleteItem(element: PeriodicElement): void {
    // Logic to delete the item from the data source
    console.log('Deleting item:', element);
    // Example: Remove the item from the data source
    this.dataSource.data = this.dataSource.data.filter(item => item !== element);
  }
  loadData() {
    this.currentPage++;
    const startIndex = this.currentPage * this.pageSize;
    const newData = this.dataSource.data.slice(startIndex, startIndex + this.pageSize);
    this.dataSource.data = [...this.dataSource.data, ...newData];
  }
  selectedRowIndex: number | null = null;
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if (event.key === 'ArrowUp') {
      this.moveUp();
    } else if (event.key === 'ArrowDown') {
      this.moveDown();
    }
  }
  moveUp() {
    if (this.selectedRowIndex !== null) {
      if (this.selectedRowIndex > 0) {
        this.selectedRowIndex--;
      }
    } else {
      this.selectedRowIndex = 0; // Если ничего не выбрано, выберите первую строку
    }
  }

  moveDown() {
    if (this.selectedRowIndex === null) {
      this.selectedRowIndex = 0; // Если ничего не выбрано, выберите первую строку
    } else if (this.selectedRowIndex < this.pageSize - 1) {
      this.selectedRowIndex++; // Перейти к следующей строке на текущей странице
    } else if (this.paginator.hasNextPage()) {
      this.loadNextPage(); // Загружаем следующую страницу, если есть
      this.selectedRowIndex = 0; // Сбрасываем на первую строку новой страницы
    }
  }
  /*selectRow(index: number): void {
    this.selectedRowIndex = index; // Устанавливаем индекс выбранной строки
    const selectedRowData = this.dataSource.data[index];
    /*const storageData = {
      ...selectedRowData,
      access: selectedRowData.access === 'Да' ? '1' : '2',
      control: selectedRowData.control === 'Да' ? '1' : '2',
    };
    // Сохраняем все документы в localStorage
    localStorage.setItem('documents', JSON.stringify(this.dataSource.data));

    // Сохраняем выбранную строку, если нужно
    localStorage.setItem('selectedRow', JSON.stringify(selectedRowData));
  }*/

  selectRow(index: number): void {
    const globalIndex = this.paginator.pageIndex * this.pageSize + index; // Вычисляем глобальный индекс
    this.selectedRowIndex = index; // Устанавливаем индекс выбранной строки на текущей странице

    if (globalIndex < this.dataSource.data.length) {
      const selectedRowData = this.dataSource.data[globalIndex];
      localStorage.setItem('selectedRow', JSON.stringify(selectedRowData));
      console.log('Выбранная строка:', selectedRowData);
    }
  }

  isSelected(row: PeriodicElement): boolean {
    const index = this.dataSource.data.indexOf(row);
    const localIndex = this.paginator.pageIndex * this.pageSize + (this.selectedRowIndex ?? 0);
    return index === localIndex;
  }

  deleteElement() {
    this.snackBar.open('Вы действительно хотите удалить данные?', 'Да', {
      duration: 3000,
    });
  }

  loadNextPage() {
    if (this.paginator.hasNextPage()) {
      this.paginator.nextPage();
      this.selectedRowIndex = 0;
    }
  }

  /* isSelected(row: PeriodicElement): boolean {
     return this.selectedRowIndex === this.dataSource.data.indexOf(row);
   }*/
  editItem(element: PeriodicElement): void {
    localStorage.setItem("selectedRow", JSON.stringify(element));
    //console.log(element)
  }
}