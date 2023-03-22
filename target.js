// Target class (position and width)
class Target
{
  taken = 0;
  constructor(x, y, w, l, t, id/*, l*/)
  {
    this.x      = x;
    this.y      = y;
    this.width  = w;
    this.label  = l;
    this.type   = t;
    this.id     = id;
    //this.last   = l;
  }
  
  // Checks if a mouse click took place
  // within the target
  clicked(mouse_x, mouse_y)
  {
    return dist(this.x, this.y, mouse_x, mouse_y) < this.width / 2;
  }
  
  draw()
  {
    // Draw target
    if (this.type == "Apple") {
      fill(color('#66b447'));  //verde
    }
    else if (this.type == "Avocado") {
      fill(color('#568203'));      //verde mais escuro
    }
    else if (this.type == "Banana") {
      fill(color('#FFFF00'));      //amarelo
    }
    else if (this.type == "Kiwi") {
      fill(color('#FFFF00'));      //verde
    }
    else if (this.type == "Lemon") {
      fill(color('#CCCC00'));
    }
    else if (this.type == "Lime") {
      fill(color('#66FF66'));
    }
    else if (this.type == "Mango") {
      fill(color('#DE950D'));
    }
    else if (this.type == "Melon") {
      fill(color('#FFE4C4'));
    }
    else if (this.type == "Nectarine") {
      fill(color('#FF7F50'));
    }
    else if (this.type == "Orange") {
      fill(color('#FFA500'));
    }
    else if (this.type == "Papaya") {
      fill(color('#E86305'));
    }
    else if (this.type == "Passion Fruit") {
      fill(color('#FFD700'));
    }
    else if (this.type == "Peach") {
      fill(color('#F02C0E'));
    }
    else if (this.type == "Pear") {
      fill(color('#BAF018'));
    }
    else if (this.type == "Pear") {
      fill(color('#BAF018'));
    }
    else if (this.type == "Pineapple") {
      fill(color('#F2EA6F'));
    }
    else if (this.type == "Plum") {
      fill(color('#DDA0DD'));
    }
    else if (this.type == "Pomegranate") {
      fill(color('#F44336'));
    }
    else if (this.type == "Red Grapefruit") {
      fill(color('#FF6347'));
    }
    else if (this.type == "Satsumas") {
      fill(color('#f27900'));
    }
    else if (this.type == "Juice") {
      fill(color('#fca43c'));      //alaranjado
    }
    else if (this.type == "Milk") {
      fill(color('#FFFFFF'));
    }
    else if (this.type == "Oatghurt") {
      fill(color('#F5DEB3'));
    }
    else if (this.type == "Oat Milk") {
      fill(color('#8c8a65'));
    }
    else if (this.type == "Sour Cream") {
      fill(color('#8c8a65'));
    }
    else if (this.type == "Sour Milk") {
      fill(color('#8c8a65'));
    }
    else if (this.type == "Soyghurt") {
      fill(color('#8c8a65'));
    }
    else if (this.type == "Soy Milk") {
      fill(color('#8c8a65'));
    }
    else if (this.type == "Yoghurt") {
      fill(color('#999996'));
    }
    else if (this.type == "Asparagus") {
      fill(color('#228B22'));
    }
    else if (this.type == "Aubergine") {
      fill(color('#483D8B'));
    }
    else if (this.type == "Cabbage") {
      fill(color('#00FF7F'));
    }
    else if (this.type == "Carrots") {
      fill(color('#FFA500'));
    }
    else if (this.type == "Cucumber") {
      fill(color('#7FFF00'));
    }
    else if (this.type == "Garlic") {
      fill(color('#D3D3D3'));
    }
    else if (this.type == "Ginger") {
      fill(color('#FFC107'));
    }
    else if (this.type == "Leek") {
      fill(color('#6B8E23'));
    }
    else if (this.type == "Mushroom") {
      fill(color('#8B4513'));
    }
    else if (this.type == "Onion") {
      fill(color('#bfbcb4'));
    }
    else if (this.type == "Pepper") {
      fill(color('#c22c0c'));
    }
    else if (this.type == "Potato") {
      fill(color('#a87e1d'));
    }
    else if (this.type == "Red Beet") {
      fill(color('#8B0000'));
    }
    else if (this.type == "Tomato") {
      fill(color('#FF6347'));
    }
    else if (this.type == "Zucchini") {
      fill(color('#00FF7F'));
    }

    rect(this.x - (this.width*0.75), this.y - (this.width*0.50),  this.width*1.5,  this.width*30);
    if (this.taken == 0) {
      fill(color(155, 155, 155));
      if(this.last == 1){
        fill(color(50, 50, 50));
      }
    }
    else fill(color('#ffd35c'));
    circle(this.x, this.y, this.width);
    // Draw label
    textFont("Arial", 12);
    fill(color(255,255,255));
    textAlign(CENTER);
    text(this.label, this.x, this.y);
  }
}
