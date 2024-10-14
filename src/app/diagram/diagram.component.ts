import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';
import { PeriodicElement } from '../element.model';
import { trigger } from '@angular/animations';

interface CountMap {
  [key: string]: number; // Индексная сигнатура
}
@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.css'
})
export class DiagramComponent implements OnInit {

  constructor(private http: HttpClient) { }
  dataSource: PeriodicElement[] = [];

  chartInstance: any;

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    /*fetch('assets/data.json')
      .then(response => response.json())
      .then(data => {
        this.initEcharts(data);
      });*/
    this.http.get<PeriodicElement[]>('/assets/data.json').subscribe(
      data => {
        console.log(data);
        this.dataSource = data;
        this.createCharts();
      },
      error => {
        console.error('Error fetching data: ', error);
      }
    );

  }

  createCharts() {
    const correspondentCount: CountMap = {};
    const deliveryTypeCount: CountMap = {};

    this.dataSource.forEach((doc) => {
      correspondentCount[doc.correspondent] = (correspondentCount[doc.correspondent] || 0) + 1;
      deliveryTypeCount[doc.formOfDelivery] = (deliveryTypeCount[doc.formOfDelivery] || 0) + 1;
    });
    const correspondentData = Object.entries(correspondentCount).map(([key, value]) => ({
      name: key,
      value: value,
    }));

    const deliveryTypeData = Object.entries(deliveryTypeCount).map(([key, value]) => ({
      name: key,
      value: value,
    }));

    this.initEcharts(correspondentData, deliveryTypeData);

  }

  initEcharts(correspondentData: { name: string; value: number }[], deliveryTypeData: { name: string; value: number }[]) {
    this.chartInstance = echarts.init(document.getElementById('chart-container'));

    const option = {
      title: {
        text: "Диаграмма",
        left: "center"
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "vertical",
        left: "left"
      },
      series: [
        {
          name: "Корреспонденты",
          type: 'pie',
          radius: '50%',
          data: correspondentData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            },
          },
        },
        {
          name: "Типы документов",
          type: 'pie',
          radius: '50%',
          data: deliveryTypeData,
          center: [{}],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            },
          },
        },
      ],
      media: [
        {
          query: { minAspectRatio: 1 },
          option: {
            series: [
              { center: ["25%", "50%"] },
              { center: ["75%", "50%"] }
            ]
          }
        }
      ]
    };
    this.chartInstance.setOption(option);
  }
}
