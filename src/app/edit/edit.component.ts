import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PeriodicElement } from '../element.model';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

export interface MyDocument {
  id: number,
  numberReg: string,
  dateReg: string,
  numberDoc: string,
  dateDoc: string,
  formOfDelivery: string,
  correspondent: string,
  theme: string,
  description: string,
  deadline: Date,
  access: string,
  control: string,
  file: string,
};

interface Option {
  value: string,
  viewValue: string
};
interface Item {
  value: string,
  viewValue: string
}
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: '../edit/edit.component.css'
})
export class EditComponent implements OnInit {
  ext = ["PDF", "DOC", "DOCX"];

  selectedRow: PeriodicElement;
  documentForm: FormGroup;
  selectedRowIndex: number = 0;
  myDocument: MyDocument[] = [];

  //documents: MyDocument[] = [];

  constructor(private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient,) {
    this.documentForm = this.fb.group({
      numberReg: [''],
      dateReg: [''],
      numberDoc: [''],
      dateDoc: [''],
      formOfDelivery: [''],
      correspondent: [''],
      theme: [''],
      description: [''],
      deadline: [''],
      access: [''],
      control: [''],
      file: ['']
    })
  }

  errorMessage: string | null = null;
  myfile: File | null = null;
  maxFileSize = 1024 * 1024;
  options: Option[] = [
    {
      value: "Курьер",
      viewValue: "Курьер"
    },
    {
      value: "Email",
      viewValue: "Email"
    },
    {
      value: "Телефонограмма",
      viewValue: "Телефонограмма"
    }
  ];
  items: Item[] = [
    {
      value: "ЦБ",
      viewValue: "ЦБ"
    }, {
      value: "ГНИ",
      viewValue: "ГНИ"
    },
    {
      value: "ТСЖ",
      viewValue: "ТСЖ"
    }
  ];


  optionControl = new FormControl<Option | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  numberReg = new FormControl('', Validators.required);
  dateReg = new FormControl('', Validators.required);
  themeReg = new FormControl('', Validators.required);
  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.myfile = inputElement.files[0];
      if (this.myfile.size > this.maxFileSize) {
        this.errorMessage = "Размер файла превышает 1Мб";
      } else if (!this.isValidExtension(this.myfile.name)) {
        this.errorMessage = "Недопустимый формат";
      } else if (!this.isValidFileType(this.myfile)) {
        this.errorMessage = "Недопустимый формат и размер файла"
      } else {
        this.myfile = null;
      }
    }
  }

  /*ngOnInit(): void {
    //localStorage.setItem("selectedRow", JSON.stringify(this.selectedRowIndex));
    /*if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem("selectedRow");
      if (userData) {
        const user = JSON.parse(userData);
        this.documentForm.patchValue(user); // Заполняем форму данными
        this.selectedRowIndex = this.items.findIndex(item => item.value === user.value);
        //this.selectedRow = this.items[this.selectedRowIndex];
        this.loadRowData();
      } else {
        console.log("Данные не найдены, значения null");
      }
    }
    this.loadFromLocalStorage();
    //console.log(this.loadDocuments());
  }*/
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromLocalStorage();
    }
  }

  loadFromLocalStorage() {
    const selectedRowData = localStorage.getItem('selectedRow');

    if (selectedRowData) {
      const selectedDocument = JSON.parse(selectedRowData);
      this.documentForm.patchValue(selectedDocument); // Заполняем форму данными
      console.log('Загруженные данные для формы:', selectedDocument);
    } else {
      console.warn('Нет выбранной строки в localStorage');
    }
  }
  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (this.selectedRow) {
      const key = target.name as keyof PeriodicElement;
      if (key in this.selectedRow) {
        //this.selectedRow[key] = target.value;
        this.documentForm.get(key)?.setValue(target.value);
      }
    }
  }
  isValidExtension(filename: string): boolean {
    const fileExt = filename.split('.').pop()?.toUpperCase();
    return this.ext.includes(fileExt || '');
  }
  isValidFileType(file: File): boolean {
    const isValidSize = file.size <= this.maxFileSize;
    const isValidExtension = this.isValidExtension(file.name);
    return isValidSize === isValidExtension;
  }

  onSubmit() {
    /*if (this.documentForm.valid) {
      console.log(this.documentForm.value);
      const documentData = this.documentForm.value;
      localStorage.setItem('documents', JSON.stringify(this.myDocument));
      localStorage.setItem('selectedRow', JSON.stringify(this.selectedRow));
      console.log('Данные сохранены в localStorage:', documentData);
    }*/
    if (this.documentForm.valid) {
      const documentData = this.documentForm.value;
      this.myDocument.push(documentData); // Добавляем новый документ в массив
      localStorage.setItem('documents', JSON.stringify(this.myDocument)); // Сохраняем массив документов
      localStorage.setItem('selectedRow', JSON.stringify(this.selectedRow)); // Сохраняем выбранную строку
      console.log('Данные сохранены в localStorage:', documentData);
    }
  }

  /*previousRow() {
    if (this.selectedRowIndex > 0) {
      console.log(this.selectedRowIndex)
      this.selectedRowIndex--;
      this.loadRowData();
    }
  }
  nextRow() {
    console.log('След строка', this.selectedRowIndex)
    //alert(this.selectedRowIndex)
    if (this.selectedRowIndex < this.myDocument.length - 1) {
      this.selectedRowIndex++;
      this.loadRowData();
    }
  }*/

  previousRow() {
    if (this.myDocument.length === 0) {
      console.warn('Список документов пуст');
      return;
    }

    if (this.selectedRowIndex > 0) {
      this.selectedRowIndex--;
      this.loadRowData();
    } else {
      console.warn('Вы находитесь на первой строке');
    }
  }

  nextRow() {
    if (this.myDocument.length === 0) {
      console.warn('Список документов пуст');
      return;
    }

    if (this.selectedRowIndex < this.myDocument.length - 1) {
      this.selectedRowIndex++;
      this.loadRowData();
    } else {
      console.warn('Вы находитесь на последней строке');
    }
  }

  /*loadDocuments() {
    this.http.get<MyDocument[]>('./assets/data.json').subscribe(data => {
      this.myDocument = data;
      console.log(this.myDocument)
      this.loadRowData();
    });
  }*/
  /*loadFromLocalStorage() {
    const storedData = localStorage.getItem('documents');
    if (storedData) {
      this.myDocument = JSON.parse(storedData);
      this.loadRowData(); // Загружаем данные для первой строки
    } else {
      console.log('Нет данных в localStorage');
    }
  }*/

  /*loadFromLocalStorage() {
    const storedData = localStorage.getItem('documents');
    const selectedRowData = localStorage.getItem('selectedRow');
    console.log("Stored Data" + storedData);
    if (storedData) {
      this.myDocument = JSON.parse(storedData);

      if (selectedRowData) {
        const selectedDocument = JSON.parse(selectedRowData);
        this.selectedRowIndex = this.myDocument.findIndex(doc => doc.id === selectedDocument.id);

        // Загружаем данные для текущей строки
        this.loadRowData();
      } else {
        console.warn('Нет выбранной строки в localStorage');
      }
    } else {
      console.warn('Нет данных в localStorage');
    }
  }*/



  /*loadRowData() {
    if (this.selectedRowIndex >= 0 && this.selectedRowIndex < this.myDocument.length) {
      const currentRow = this.myDocument[this.selectedRowIndex];
      this.documentForm.patchValue(currentRow);
      console.log('Загруженные данные:', currentRow);
    }
  }*/
  loadRowData() {
    if (this.selectedRowIndex >= 0 && this.selectedRowIndex < this.myDocument.length) {
      const currentRow = this.myDocument[this.selectedRowIndex];
      this.documentForm.patchValue(currentRow); // Заполняем форму текущими данными
      console.log('Загруженные данные:', currentRow);
    }
  }
}
