import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

export interface MyDocument {
  numberReg: string,
  dateReg: Date,
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
  selector: 'app-add',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatRadioModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  //options = ["Курьер", "Email", "Телефонограмма"];
  //items = ["ЦБ", "ГНИ", "ТСЖ"];
  ext = ["PDF", "DOC", "DOCX"];

  //documentForm: FormGroup;

  /*constructor(
    private formBuilder: FormBuilder,
    private documentService: DataService
  ) {
    this.documentForm = this.formBuilder.group({
      numberReg: ['', Validators.required] // Создание контроллера с обязательным полем
    });
    /*this.documentForm = new FormGroup({
      numberFormControl: new FormControl('', [Validators.required]),
      dateReg: new FormControl('', [Validators.required]),
      numberDoc: new FormControl('', [Validators.required]),
      dataDoc: new FormControl('', [Validators.required]),
      formOfDelivery: new FormControl('', [Validators.required]),
      correspondent: new FormControl('', [Validators.required]),
      theme: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
      access: new FormControl('', [Validators.required]),
      control: new FormControl('', [Validators.required]),
      myfile: new FormControl('', [Validators.required])
    });
  };*/
  /*onSubmit(): void {
    if (this.documentForm.valid) {
      const document: MyDocument = this.documentForm.value;
      this.documentService.saveDataToJson(document);
      this.documentForm.reset();
    }
  }
  onSubmit() {
    if (this.documentForm.valid) {
      console.log(this.documentForm.value);
    }
  }*/
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

  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  /* moveToNext(currentField: HTMLInputElement, nextFieldId: string) {
     if (currentField.value.length >= currentField.maxLength) {
       const nextField = document.getElementById(nextFieldId) as HTMLInputElement;
       if (nextField) {
         nextField.focus()
       }
     }
   }*/

}
