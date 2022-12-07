import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit,AfterViewInit {
  @ViewChild('mapSearchField') searchField:ElementRef | undefined;
  @ViewChild(GoogleMap) map:GoogleMap | undefined;

  initialCoordinates={
    lat:46.533408,
    lng:8.352592
  }
  mapConfigurations={
    disableDefaultUI:true,
    fullscreenControl:true,
    zoomControl:true,
  }
  constructor() { }
  ngAfterViewInit(): void {
    const searcBox=new google.maps.places.SearchBox(
      this.searchField?.nativeElement
    );
    // this.map?.controls[google.maps.ControlPosition.TOP_CENTER].push(
    //   this.searchField?.nativeElement
    // );
    searcBox.addListener('places_changed',()=>{
      const places=searcBox.getPlaces();
      if(places?.length===0){
        return ;
      }
      const bounds=new google.maps.LatLngBounds();
      places?.forEach(place=>{
        if(!place.geometry || !place.geometry.location){
          return;
        }
        if(place.geometry.viewport){
          bounds.union(place.geometry.viewport);
        }else{
          bounds.extend(place.geometry.location);
        }
      });
      this.map?.fitBounds(bounds);
    })
  }

  ngOnInit() {}

}
