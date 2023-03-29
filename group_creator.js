// Regions around each target group
class Group_Creator
{ 
  constructor() 
  {
    /*this.x = x;
    this.y = y;*/
  }
  
  draw()
  {
    fill('#FFA500');
    rect(0, 0, displayWidth, displayHeight/6.8);
    
    //Writes the label
    textFont("Arial", 20);
    fill('#000000');
    textAlign(CENTER, TOP);
    text("Juices", displayWidth/2, displayWidth*0.003);
    
    
    fill('#FFFFFF');
    rect(0, displayHeight/6.8, displayWidth, displayHeight*0.122);
    
    //Writes the label
    textFont("Arial", 20);
    fill('#000000');
    textAlign(CENTER, TOP);
    text("Milks", displayWidth/2, displayHeight/6.8 + displayWidth*0.003);
    
    
    fill('#E0CDB2');
    rect(0, displayHeight/6.8 + displayHeight*0.122, displayWidth, displayHeight*0.122);
    
    //Writes the label
    textFont("Arial", 20);
    fill('#000000');
    textAlign(CENTER, TOP);
    text("Yoghurts & Creams", displayWidth/2, displayHeight/6.8 + displayHeight*0.122 + displayWidth*0.003);
    
    
    fill('#F44336' );
    rect(0, displayHeight/6.8 + displayHeight*0.244, displayWidth, displayHeight*0.318);
    
    //Writes the label
    textFont("Arial", 20);
    fill('#000000');
    textAlign(CENTER, TOP);
    text("Fruits", displayWidth/2, displayHeight/6.8 + displayHeight*0.244 + displayWidth*0.003);
    
    
    fill('#4CAF50');
    rect(0, displayHeight/6.8 + displayHeight*0.561, displayWidth, 2*displayHeight*0.12);
    
    //Writes the label
    textFont("Arial", 20);
    fill('#000000');
    textAlign(CENTER, TOP);
    text("Vegetables", displayWidth/2, displayHeight/6.8 + displayHeight*0.558 + displayWidth*0.003);
  }
}
