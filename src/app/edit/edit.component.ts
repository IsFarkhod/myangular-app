import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PeriodicElement } from '../read/read.component';

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
    MatGridListModule,
    MatRadioModule,
    ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: '../add/add.component.css'
})
export class EditComponent {
  ext = ["PDF", "DOC", "DOCX"];

  selectedRow: PeriodicElement;
  documentForm: FormGroup;
  constructor(private fb: FormBuilder) {

  }


  errorMessage: string | null = null;
  myfile: File | null = null;
  maxFileSize = 1024 * 1024;
  options: Option[] = [
    {
      value: "Курьер-0",
      viewValue: "Курьер"
    },
    {
      value: "Email-1",
      viewValue: "Email"
    },
    {
      value: "Телефонограмма-2",
      viewValue: "Телефонограмма"
    }
  ];
  items: Item[] = [
    {
      value: "ЦБ-0",
      viewValue: "ЦБ"
    }, {
      value: "ГНИ-1",
      viewValue: "ГНИ"
    },
    {
      value: "ТСЖ-2",
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
}
