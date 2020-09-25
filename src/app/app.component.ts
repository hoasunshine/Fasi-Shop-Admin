import { Component, OnInit } from '@angular/core';
import { mainModule } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Admin Sun Shop';

  ngOnInit() {}

  async ngAfterViewInit() {
    await this.loadScript('./assets/js/vendor/modernizr-2.8.3.min.js');
    await this.loadScript('./assets/js/vendor/jquery-2.2.4.min.js');
    await this.loadScript('./assets/js/popper.min.js');
    await this.loadScript('./assets/js/bootstrap.min.js');
    
    await this.loadScript('./assets/js/owl.carousel.min.js');
    await this.loadScript('./assets/js/metisMenu.min.js');
    await this.loadScript('./assets/js/jquery.slimscroll.min.js');
    await this.loadScript('./assets/js/jquery.slicknav.min.js');
    await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js')
    await this.loadScript('https://code.highcharts.com/highcharts.js')
    await this.loadScript('https://cdn.zingchart.com/zingchart.min.js')
    await this.loadScript('./assets/js/line-chart.js');
    await this.loadScript('./assets/js/pie-chart.js');
    await this.loadScript('./assets/js/plugins.js');
    await this.loadScript('./assets/js/scripts.js');
  }

  loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }
}
