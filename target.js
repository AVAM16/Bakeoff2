// Target class (position and width)
class Target
{
  taken = 0;
  constructor(x, y, w, l, t, id, ls)
  {
    this.x      = x;
    this.y      = y;
    this.width  = w;
    this.label  = l;
    this.type   = t;
    this.id     = id;
    this.last   = ls;
  }
  
  // Checks if a mouse click took place
  // within the target
  clicked(mouse_x, mouse_y)
  {
    return dist(this.x, this.y, mouse_x, mouse_y) < this.width / 2;
  }
  
  draw()
  {
    let megatype = "Nada";
    // Draw target
    if (this.type == "Apple") {
      megatype = "Fruit";
      fill(color('#66b447'));  //verde
    }
    else if (this.type == "Avocado") {
      megatype = "Fruit";
      fill(color('#568203'));      //verde mais escuro
    }
    else if (this.type == "Banana") {
      megatype = "Fruit";
      fill(color('#FFFF00'));      //amarelo
    }
    else if (this.type == "Kiwi") {
      megatype = "Fruit";
      fill(color('#FFFF00'));      //verde
    }
    else if (this.type == "Lemon") {
      megatype = "Fruit";
      fill(color('#CCCC00'));
    }
    else if (this.type == "Lime") {
      megatype = "Fruit";
      fill(color('#66FF66'));
    }
    else if (this.type == "Mango") {
      megatype = "Fruit";
      fill(color('#DE950D'));
    }
    else if (this.type == "Melon") {
      megatype = "Fruit";
      fill(color('#FFE4C4'));
    }
    else if (this.type == "Nectarine") {
      megatype = "Fruit";
      fill(color('#FF7F50'));
    }
    else if (this.type == "Orange") {
      megatype = "Fruit";
      fill(color('#FFA500'));
    }
    else if (this.type == "Papaya") {
      megatype = "Fruit";
      fill(color('#E86305'));
    }
    else if (this.type == "Passion Fruit") {
      megatype = "Fruit";
      fill(color('#FFD700'));
    }
    else if (this.type == "Peach") {
      megatype = "Fruit";
      fill(color('#F02C0E'));
    }
    else if (this.type == "Pear") {
      megatype = "Fruit";
      fill(color('#BAF018'));
    }
    else if (this.type == "Pineapple") {
      megatype = "Fruit";
      fill(color('#F2EA6F'));
    }
    else if (this.type == "Plum") {
      megatype = "Fruit";
      fill(color('#DDA0DD'));
    }
    else if (this.type == "Pomegranate") {
      megatype = "Fruit";
      fill(color('#F44336'));
    }
    else if (this.type == "Red Grapefruit") {
      megatype = "Fruit";
      fill(color('#FF6347'));
    }
    else if (this.type == "Satsumas") {
      megatype = "Fruit";
      fill(color('#f27900'));
    }
    else if (this.type == "Juice") {
      megatype = "Liquid";
      fill(color('#fca43c'));      //alaranjado
    }
    else if (this.type == "Milk") {
      megatype = "Dairy";
      fill(color('#FFFFFF'));
    }
    else if (this.type == "Oatghurt") {
      megatype = "Alternative";
      fill(color('#F5DEB3'));
    }
    else if (this.type == "Oat Milk") {
      megatype = "Alternative";
      fill(color('#8c8a65'));
    }
    else if (this.type == "Sour Cream") {
      megatype = "Dairy";
      fill(color('#8c8a65'));
    }
    else if (this.type == "Sour Milk") {
      megatype = "Dairy";
      fill(color('#8c8a65'));
    }
    else if (this.type == "Soyghurt") {
      megatype = "Alternative";
      fill(color('#8c8a65'));
    }
    else if (this.type == "Soy Milk") {
      megatype = "Alternative";
      fill(color('#8c8a65'));
    }
    else if (this.type == "Yoghurt") {
      megatype = "Dairy";
      fill(color('#999996'));
    }
    else if (this.type == "Asparagus") {
      megatype = "Vegetable";
      fill(color('#228B22'));
    }
    else if (this.type == "Aubergine") {
      megatype = "Fruit";
      fill(color('#483D8B'));
    }
    else if (this.type == "Cabbage") {
      megatype = "Vegetable";
      fill(color('#00FF7F'));
    }
    else if (this.type == "Carrots") {
      megatype = "Vegetable";
      fill(color('#FFA500'));
    }
    else if (this.type == "Cucumber") {
      megatype = "Fruit";
      fill(color('#7FFF00'));
    }
    else if (this.type == "Garlic") {
      megatype = "Vegetable";
      fill(color('#D3D3D3'));
    }
    else if (this.type == "Ginger") {
      megatype = "Vegetable";
      fill(color('#FFC107'));
    }
    else if (this.type == "Leek") {
      megatype = "Vegetable";
      fill(color('#6B8E23'));
    }
    else if (this.type == "Mushroom") {
      megatype = "Fungus";
      fill(color('#8B4513'));
    }
    else if (this.type == "Onion") {
      megatype = "Vegetable";
      fill(color('#bfbcb4'));
    }
    else if (this.type == "Pepper") {
      megatype = "Fruit";
      fill(color('#c22c0c'));
    }
    else if (this.type == "Potato") {
      megatype = "Vegetable";
      fill(color('#a87e1d'));
    }
    else if (this.type == "Red Beet") {
      megatype = "Vegetable";
      fill(color('#8B0000'));
    }
    else if (this.type == "Tomato") {
      megatype = "Fruit";
      fill(color('#FF6347'));
    }
    else if (this.type == "Zucchini") {
      megatype = "Fruit";
      fill(color('#00FF7F'));
    }

    let firstletter = this.label.charAt(0);
    
    rect(this.x - (this.width*0.75), this.y - (this.width*0.50),  this.width*1.5,  this.width*30); //create the rectangle

    if (this.taken == 0) {
      fill(color(155, 155, 155));
      
    }
    else fill(color('#ffd35c'));
    circle(this.x, this.y, this.width);
    // Draw label   
    textFont("Arial", 12);
    fill(color(255,255,255));
    textAlign(CENTER);
    text(this.label, this.x, this.y);
    textFont("Arial", 14);
    fill('#0435d6');
    textAlign(CENTER, TOP);
    text(this.type, this.x, this.y - this.width/5);
    if(this.last == 1){
      fill('#b50404');
      textAlign(CENTER, BOTTOM);
      text(megatype, this.x, this.y + this.width/3);
    }
    textFont("Arial", 25);
    fill('#000000');
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(firstletter, this.x - this.width/2.5, this.y - this.width/2.5);
    textFont("Arial", 12);
    textAlign(CENTER,TOP);
    fill('#ffffff');
  }
}
