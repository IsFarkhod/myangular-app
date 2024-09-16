import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PeriodicElement } from '../element.model';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/*export interface MyDocument {
  numberReg: string,
  dateReg: string,
  numberDoc: string,
  dataDoc: string,
  formOfDelivery: string,
  correspondent: string,
  theme: string,
  description: string,
  deadline: Date,
  access: string,
  control: string,
  myfile: string,
};*/

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
    ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: '../edit/edit.component.css'
})
export class EditComponent implements OnInit {
  ext = ["PDF", "DOC", "DOCX"];

  selectedRow: PeriodicElement;
  documentForm: FormGroup;
  selectedRowIndex: number = 0;

  constructor(private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
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

  ngOnInit(): void {
    const userData = localStorage.getItem("selectedRow");
    if (userData) {
      const user = JSON.parse(userData);
      this.documentForm.patchValue(user); // Заполняем форму данными
      this.selectedRowIndex = this.items.findIndex(item => item.value === user.value);
    } else {
      console.log("Данные не найдены, значения null")
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
    if (this.documentForm.valid) {
      console.log(this.documentForm.value);
    }
  }

  previousRow() {
    if (this.selectedRowIndex > 0) {
      alert(this.selectedRowIndex)
      this.selectedRowIndex--;
      this.loadRowData();
    }
  }
  nextRow() {
    console.log('След строка', this.selectedRowIndex)
    alert(this.selectedRowIndex)
    if (this.selectedRowIndex !== null && this.selectedRowIndex < (this.items.length - 1)) {
      this.selectedRowIndex++;
      this.loadRowData();
    }
  }

  loadRowData() {
    if (this.selectedRowIndex !== null) {
      alert(this.selectedRowIndex)
      const currentRow = this.items[this.selectedRowIndex]; // Используйте items или другой источник данных
      this.documentForm.patchValue(currentRow);
    }
  }
}
