import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface PeriodicElement {
  // id: number;
  numberReg: string;
  dateReg: string;
  numberDoc: string;
  dateDoc: string;
  formOfDelivery: string;
  correspondent: string;
  theme: string;
  description: string;
  deadline: string;
  access: string;
  control: string;
  file: string;
  showDelete?: boolean;
  isFocused?: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    /*id: 1,*/ numberReg: "EGR190378", dateReg: "18.01.2024", numberDoc: "EDF147852", dateDoc: "21.01.2024", formOfDelivery: "Email", correspondent: "ГНИ", theme: "Тема документа1", description: "Описание документа1",
    deadline: "15.02.2024", access: "Да", control: "Да", file: "path/to/file1"
  },
  {
   /* id: 2,*/ numberReg: "OFE850147", dateReg: "16.08.2024", numberDoc: "OFV254789", dateDoc: "18.08.2024", formOfDelivery: "Курьер", correspondent: "ЦБ", theme: "Тема документа2", description: "Описание документа2",
    deadline: "22.08.2024", access: "Нет", control: "Да", file: "path/to/file2"
  },
  {
    /*id: 3,*/ numberReg: "ABE559406", dateReg: "12.05.2024", numberDoc: "RTY012477", dateDoc: "14.05.2024", formOfDelivery: "Телефонограмма", correspondent: "ТЦ", theme: "Тема документа3", description: "Описание документа3",
    deadline: "15.06.2024", access: "Нет", control: "нет", file: "path/to/file3"
  },
  {
    /*id: 4,*/ numberReg: "JOO017845", dateReg: "01.07.2024", numberDoc: "BNO963258", dateDoc: "05.07.2024", formOfDelivery: "Курьер", correspondent: "ГНИ", theme: "Тема документа4", description: "Описание документа4",
    deadline: "11.08.2024", access: "Да", control: "Нет", file: "path/to/file4"
  },
  {
  /*  id: 5,*/ numberReg: "FER965201", dateReg: "15.09.2024", numberDoc: "CVS753951", dateDoc: "17.09.2024", formOfDelivery: "Телефонограмма", correspondent: "ГНИ", theme: "Тема документа5", description: "Описание документа5",
    deadline: "07.10.2024", access: "Да", control: "Да", file: "path/to/file5"
  },
  {
    /*id: 6,*/ numberReg: "NMQ712573", dateReg: "13.03.2024", numberDoc: "KJI458963", dateDoc: "15.03.2024", formOfDelivery: "Email", correspondent: "ТЦ", theme: "Тема документа6", description: "Описание документа6",
    deadline: "17.04.2024", access: "Нет", control: "Да", file: "path/to/file6"
  },
  {
    /*id: 7,*/ numberReg: "SAQ250189", dateReg: "22.04.2024", numberDoc: "PLP742369", dateDoc: "24.04.2024", formOfDelivery: "Курьер", correspondent: "ЦБ", theme: "Тема документа7", description: "Описание документа7",
    deadline: "28.09.2024", access: "Да", control: "Нет", file: "path/to/file7"
  },
  {
    /*id: 8,*/ numberReg: "JOO017845", dateReg: "01.07.2024", numberDoc: "BNO963258", dateDoc: "05.07.2024", formOfDelivery: "Курьер", correspondent: "ГНИ", theme: "Тема документа4", description: "Описание документа4",
    deadline: "11.08.2024", access: "Да", control: "Нет", file: "path/to/file4"
  },
  {
    /*id: 9,*/ numberReg: "FER965201", dateReg: "15.09.2024", numberDoc: "CVS753951", dateDoc: "17.09.2024", formOfDelivery: "Телефонограмма", correspondent: "ГНИ", theme: "Тема документа5", description: "Описание документа5",
    deadline: "07.10.2024", access: "Да", control: "Да", file: "path/to/file5"
  },
  {
    /*id: 10,*/ numberReg: "NMQ712573", dateReg: "13.03.2024", numberDoc: "KJI458963", dateDoc: "15.03.2024", formOfDelivery: "Email", correspondent: "ТЦ", theme: "Тема документа6", description: "Описание документа6",
    deadline: "17.04.2024", access: "Нет", control: "Да", file: "path/to/file6"
  },
  {
    /*id: 11,*/ numberReg: "SAQ250189", dateReg: "22.04.2024", numberDoc: "PLP742369", dateDoc: "24.04.2024", formOfDelivery: "Курьер", correspondent: "ЦБ", theme: "Тема документа7", description: "Описание документа7",
    deadline: "28.09.2024", access: "Да", control: "Нет", file: "path/to/file7"
  },
  {
    /*id: 12,*/ numberReg: "JOO017845", dateReg: "01.07.2024", numberDoc: "BNO963258", dateDoc: "05.07.2024", formOfDelivery: "Курьер", correspondent: "ГНИ", theme: "Тема документа4", description: "Описание документа4",
    deadline: "11.08.2024", access: "Да", control: "Нет", file: "path/to/file4"
  },
  {
    /*id: 13,*/ numberReg: "FER965201", dateReg: "15.09.2024", numberDoc: "CVS753951", dateDoc: "17.09.2024", formOfDelivery: "Телефонограмма", correspondent: "ГНИ", theme: "Тема документа5", description: "Описание документа5",
    deadline: "07.10.2024", access: "Да", control: "Да", file: "path/to/file5"
  },
  {
    /*id: 14,*/ numberReg: "NMQ712573", dateReg: "13.03.2024", numberDoc: "KJI458963", dateDoc: "15.03.2024", formOfDelivery: "Email", correspondent: "ТЦ", theme: "Тема документа6", description: "Описание документа6",
    deadline: "17.04.2024", access: "Нет", control: "Да", file: "path/to/file6"
  },
  {
    /*id: 15,*/ numberReg: "SAQ250189", dateReg: "22.04.2024", numberDoc: "PLP742369", dateDoc: "24.04.2024", formOfDelivery: "Курьер", correspondent: "ЦБ", theme: "Тема документа7", description: "Описание документа7",
    deadline: "28.09.2024", access: "Да", control: "Нет", file: "path/to/file7"
  },
  {
    /*id: 16,*/ numberReg: "JOO017845", dateReg: "01.07.2024", numberDoc: "BNO963258", dateDoc: "05.07.2024", formOfDelivery: "Курьер", correspondent: "ГНИ", theme: "Тема документа4", description: "Описание документа4",
    deadline: "11.08.2024", access: "Да", control: "Нет", file: "path/to/file4"
  },
  {
    /*id: 17,*/ numberReg: "FER965201", dateReg: "15.09.2024", numberDoc: "CVS753951", dateDoc: "17.09.2024", formOfDelivery: "Телефонограмма", correspondent: "ГНИ", theme: "Тема документа5", description: "Описание документа5",
    deadline: "07.10.2024", access: "Да", control: "Да", file: "path/to/file5"
  },
  {
    /*id: 18,*/ numberReg: "NMQ712573", dateReg: "13.03.2024", numberDoc: "KJI458963", dateDoc: "15.03.2024", formOfDelivery: "Email", correspondent: "ТЦ", theme: "Тема документа6", description: "Описание документа6",
    deadline: "17.04.2024", access: "Нет", control: "Да", file: "path/to/file6"
  },
  {
    /*id: 19,*/ numberReg: "SAQ250189", dateReg: "22.04.2024", numberDoc: "PLP742369", dateDoc: "24.04.2024", formOfDelivery: "Курьер", correspondent: "ЦБ", theme: "Тема документа7", description: "Описание документа7",
    deadline: "28.09.2024", access: "Да", control: "Нет", file: "path/to/file7"
  },
  {
    /*id: 20,*/ numberReg: "JOO017845", dateReg: "01.07.2024", numberDoc: "BNO963258", dateDoc: "05.07.2024", formOfDelivery: "Курьер", correspondent: "ГНИ", theme: "Тема документа4", description: "Описание документа4",
    deadline: "11.08.2024", access: "Да", control: "Нет", file: "path/to/file4"
  },
  {
    /*id: 21,*/ numberReg: "FER965201", dateReg: "15.09.2024", numberDoc: "CVS753951", dateDoc: "17.09.2024", formOfDelivery: "Телефонограмма", correspondent: "ГНИ", theme: "Тема документа5", description: "Описание документа5",
    deadline: "07.10.2024", access: "Да", control: "Да", file: "path/to/file5"
  },
  {
    /*id: 22,*/ numberReg: "NMQ712573", dateReg: "13.03.2024", numberDoc: "KJI458963", dateDoc: "15.03.2024", formOfDelivery: "Email", correspondent: "ТЦ", theme: "Тема документа6", description: "Описание документа6",
    deadline: "17.04.2024", access: "Нет", control: "Да", file: "path/to/file6"
  },
  {
    /*id: 23,*/ numberReg: "SAQ250189", dateReg: "22.04.2024", numberDoc: "PLP742369", dateDoc: "24.04.2024", formOfDelivery: "Курьер", correspondent: "ЦБ", theme: "Тема документа7", description: "Описание документа7",
    deadline: "28.09.2024", access: "Да", control: "Нет", file: "path/to/file7"
  },
  {
    /*id: 24,*/ numberReg: "NMQ712573", dateReg: "13.03.2024", numberDoc: "KJI458963", dateDoc: "15.03.2024", formOfDelivery: "Email", correspondent: "ТЦ", theme: "Тема документа6", description: "Описание документа6",
    deadline: "17.04.2024", access: "Нет", control: "Да", file: "path/to/file6"
  },
  {
    /*id: 25,*/ numberReg: "SAQ250189", dateReg: "22.04.2024", numberDoc: "PLP742369", dateDoc: "24.04.2024", formOfDelivery: "Курьер", correspondent: "ЦБ", theme: "Тема документа7", description: "Описание документа7",
    deadline: "28.09.2024", access: "Да", control: "Нет", file: "path/to/file7"
  },
  {
    /*id: 26,*/ numberReg: "JOO017845", dateReg: "01.07.2024", numberDoc: "BNO963258", dateDoc: "05.07.2024", formOfDelivery: "Курьер", correspondent: "ГНИ", theme: "Тема документа4", description: "Описание документа4",
    deadline: "11.08.2024", access: "Да", control: "Нет", file: "path/to/file4"
  },
  {
    /*id: 27,*/ numberReg: "FER965201", dateReg: "15.09.2024", numberDoc: "CVS753951", dateDoc: "17.09.2024", formOfDelivery: "Телефонограмма", correspondent: "ГНИ", theme: "Тема документа5", description: "Описание документа5",
    deadline: "07.10.2024", access: "Да", control: "Да", file: "path/to/file5"
  },
  {
    /*id: 28,*/ numberReg: "NMQ712573", dateReg: "13.03.2024", numberDoc: "KJI458963", dateDoc: "15.03.2024", formOfDelivery: "Email", correspondent: "ТЦ", theme: "Тема документа6", description: "Описание документа6",
    deadline: "17.04.2024", access: "Нет", control: "Да", file: "path/to/file6"
  },
  {
    /*id: 29,*/ numberReg: "SAQ250189", dateReg: "22.04.2024", numberDoc: "PLP742369", dateDoc: "24.04.2024", formOfDelivery: "Курьер", correspondent: "ЦБ", theme: "Тема документа7", description: "Описание документа7",
    deadline: "28.09.2024", access: "Да", control: "Нет", file: "path/to/file7"
  },
  {
    /*id: 30,*/ numberReg: "NMQ712573", dateReg: "13.03.2024", numberDoc: "KJI458963", dateDoc: "15.03.2024", formOfDelivery: "Email", correspondent: "ТЦ", theme: "Тема документа6", description: "Описание документа6",
    deadline: "17.04.2024", access: "Нет", control: "Да", file: "path/to/file6"
  },

];

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadComponent implements AfterViewInit {
  selectedRow: PeriodicElement;
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [/*'id',*/ 'numberReg', 'dateReg', 'numberDoc', 'dateDoc', 'formOfDelivery', 'correspondent', 'theme', 'description', 'deadline', 'access', 'control', 'file', /*'actions'*/];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  pageSize = 5;
  currentPage = 0;

  constructor(private snackBar: MatSnackBar) {

    // this.selectedRow = this.dataService.getSelectedRow();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.length = ELEMENT_DATA.length;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    const newData = ELEMENT_DATA.slice(startIndex, startIndex + this.pageSize);
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
    if (this.selectedRowIndex !== null && this.selectedRowIndex > 0) {
      this.selectedRowIndex--; // Перейти к предыдущей строке
    } else if (this.selectedRowIndex === null) {
      this.selectedRowIndex = 0; // Если ничего не выбрано, выберите первую строку
    }
  }

  moveDown() {
    if (this.selectedRowIndex === null) {
      this.selectedRowIndex = 0; // Если ничего не выбрано, выберите первую строку
    } else if (this.selectedRowIndex < this.dataSource.data.length - 1) {
      this.selectedRowIndex++; // Перейти к следующей строке
    } else {
      this.loadNextPage();
    }
  }
  selectRow(index: number): void {
    this.selectedRowIndex = index; // Установить индекс выбранной строки
  }

  deleteElement() {
    //alert("Вы уверены что хотите удалить данные?");

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

  isSelected(row: PeriodicElement): boolean {
    return this.selectedRowIndex === this.dataSource.data.indexOf(row);
  }
}