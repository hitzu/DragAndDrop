import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { moveItemInArray, CdkDragDrop, CdkDragStart, CdkDrop, CdkDragEnter } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild("MessagerieElement") messagerieElement : ElementRef;
  @ViewChild("CustomerExperienceElement") customerExperienceElement : ElementRef;
  @ViewChild("BlogElement") blogElement : ElementRef;

  public tile_messagerie_Styles : any;
  public customer_experience_Styles : any;
  public blog_tile_Styles : any;
  public topLeftHistory : Array<any> = []
  public startTop : number
  public startLeft : number

  public arrayMainTiles = [{
    selected : true,
    name : 'Messagerie',
    config : {
      'top': 1, 
      'left':1,
      'width' : 160,
      'height' : 129
    }
  },
  {
    selected : true,
    name : 'Blog',
    config : {
      'top': 1, 
      'left':1,
      'width' : 343,
      'height' : 178
    }
  },
  {
    selected : true,
    name : 'Customer_Experience',
    config : {
      'top': 1, 
      'left':1,
      'width' : 160,
      'height' : 129
    }
  }
]

  ngOnInit() {
  }

  ngAfterViewInit(){
    
  }
  
  updateDataTiles(){
    this.arrayMainTiles.forEach((currentTile) =>{
      if(currentTile.selected){
        if(currentTile.name == "Messagerie"){
          currentTile.config.left = this.messagerieElement.nativeElement.offsetLeft
          currentTile.config.top = this.messagerieElement.nativeElement.offsetTop
        }
        if(currentTile.name == "Customer_Experience"){
          currentTile.config.left = this.customerExperienceElement.nativeElement.offsetLeft
          currentTile.config.top = this.customerExperienceElement.nativeElement.offsetTop
        }
        if(currentTile.name == "Blog"){
          currentTile.config.left = this.blogElement.nativeElement.offsetLeft
          currentTile.config.top = this.blogElement.nativeElement.offsetTop
        }
      }
    })
  }

  dragStart(event : CdkDragStart, tileMoved : string){
    this.updateDataTiles()
    let tile = this.arrayMainTiles.filter(tileStartMoved => tileStartMoved.name == tileMoved)
    this.startTop = tile[0].config.top
    this.startLeft = tile[0].config.left
  }

  searchOverlap(event : any, tileIsMoving : string ){
    this.topLeftHistory.forEach(history => {
      this.arrayMainTiles.forEach(searchLastStep => {
        if(searchLastStep.name == history.name){
            switch(searchLastStep.name) { 
              case 'Messagerie': { 
                  this.tile_messagerie_Styles = { transform: `translate(${history.left}px,${history.top}px)` }
                break; 
              } 
              case 'Customer_Experience': { 
                  this.customer_experience_Styles = { transform: `translate(${history.left}px,${history.top}px)` }
                break; 
              } 
              case 'Blog': { 
                this.blog_tile_Styles = { transform: `translate(${history.left}px,${history.top}px)` }
                break; 
            } 
              default: { 
                //statements; 
                break; 
              } 
          }
        }
      })
    })

    this.arrayMainTiles.forEach(searchTileOverlap => {
      if( ( (event.pointerPosition.x > searchTileOverlap.config.left) && (event.pointerPosition.x < searchTileOverlap.config.left + searchTileOverlap.config.width) ) &&
      ( (event.pointerPosition.y > searchTileOverlap.config.top) && (event.pointerPosition.y < searchTileOverlap.config.top + searchTileOverlap.config.height) &&
      tileIsMoving != searchTileOverlap.name ) 
      ){
        let positionx = this.startLeft - searchTileOverlap.config.left 
        let positiony = this.startTop - searchTileOverlap.config.top 
        this.topLeftHistory.push({top : searchTileOverlap.config.top, left : searchTileOverlap.config.left , name : searchTileOverlap.name})
        switch(searchTileOverlap.name) { 
          case 'Messagerie': { 
              this.tile_messagerie_Styles = { transform: `translate(${positionx}px,${positiony}px)` }
             break; 
          } 
          case 'Customer_Experience': { 
              this.customer_experience_Styles = { transform: `translate(${positionx}px,${positiony}px)` }
             break; 
          } 
          case 'Blog': { 
            this.blog_tile_Styles = { transform: `translate(${positionx}px,${positiony}px)` }
            break; 
         } 
          default: { 
             //statements; 
             break; 
          } 
       } 
      }
    })
    this.updateDataTiles()
  }
  

  dragEnded($event){
    
  }
}
