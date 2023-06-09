// Bakeoff #2 -- Seleção em Interfaces Densas
// IPM 2022-23, Período 3
// Entrega: até dia 31 de Março às 23h59 através do Fenix
// Bake-off: durante os laboratórios da semana de 10 de Abril

// p5.js reference: https://p5js.org/reference/

// Database (CHANGE THESE!)
const GROUP_NUMBER        = 35;      // Add your group number here as an integer (e.g., 2, 3)
const RECORD_TO_FIREBASE  = false;  // Set to 'true' to record user results to Firebase

// Pixel density and setup variables (DO NOT CHANGE!)
let PPI, PPCM;
const NUM_OF_TRIALS       = 12;      // The numbers of trials (i.e., target selections) to be completed
const GRID_ROWS           = 8;      // We divide our 80 targets in a 8x10 grid
const GRID_COLUMNS        = 10;     // We divide our 80 targets in a 8x10 grid
let continue_button;
let legendas;                       // The item list from the "legendas" CSV

// Metrics
let testStartTime, testEndTime;     // time between the start and end of one attempt (8 trials)
let hits 			      = 0;      // number of successful selections
let misses 			      = 0;      // number of missed selections (used to calculate accuracy)
let database;                       // Firebase DB  

// Study control parameters
let draw_targets          = false;  // used to control what to show in draw()
let trials;                         // contains the order of targets that activate in the test
let current_trial         = 0;      // the current trial number (indexes into trials array above)
let attempt               = 0;      // users complete each test twice to account for practice (attemps 0 and 1)

// Target list
let targets               = [];

// Ensures important data is loaded before the program starts
function preload()
{
  legendas = loadTable('legendas.csv', 'csv', 'header');
}

// Runs once at the start
function setup()
{
  createCanvas(700, 500);    // window size in px before we go into fullScreen()
  frameRate(60);             // frame rate (DO NOT CHANGE!)
  
  randomizeTrials();         // randomize the trial order at the start of execution
  drawUserIDScreen();        // draws the user start-up screen (student ID and display size)
}

let array_group = [];

// Runs every frame and redraws the screen
function draw()
{
  if (!draw_targets && attempt == 0) {
    textFont("Arial", 14);
    textAlign(CENTER);
    fill('#ffffff');
    text("Demora o teu tempo a analisar o layout. O tempo só começa a contar após o primeiro clique.", displayWidth/4.1, displayHeight/3);
    text("Existem 5 categorias de comida, Juices, Milks, Yoghurts and Creams, Fruits e Vegetables.", displayWidth/4.1, displayHeight/3 + displayWidth*0.02);
    text("Respetivamente, estão associadas as cores laranja, branco, castanho creme, vermelho e verde.", displayWidth/4.1, displayHeight/3 + displayWidth*0.04);
    text("Dentro de cada categoria as comidas estão organizadas por ordem alfabética.", displayWidth/4.1, displayHeight/3 + displayWidth*0.06);
  }
  if (draw_targets && attempt < 2)
  { 
    
    cursor('pixil-frame-0.png', 40, 40);    
    // The user is interacting with the 6x3 target grid
    background(color(0,0,0));        // sets background to black
    
    // Print trial count at the top left-corner of the canvas
    textFont("Arial", 16);
    fill(color(255,255,255));
    textAlign(LEFT);
    text("Trial " + (current_trial + 1) + " of " + trials.length, 50, 20);
    
    array_group[0].draw();
    // Draw all targets
    for (var i = 0; i < legendas.getRowCount(); i++){
      targets[i].draw();
    }
    // Draw the target label to be selected in the current trial
    fill(color(0,0,0));
    rect(0, height - 15, width, 15);      // draws a black rectangle behind the trial label for optimal contrast          
    textFont("Arial", 20);
    fill(color(255,255,255)); 
    textAlign(CENTER);
    text(legendas.getString(trials[current_trial],0), width/2, height - 20);

    // for (var i = 0; i < legendas.getRowCount(); i++)
    // {
    //   // Check if the user clicked over one of the targets
    //   if (targets[i].clicked(mouseX, mouseY)) 
    //   {
    //     cursor(HAND);
    //   }
    // }
  }
}

// Print and save results at the end of 54 trials
function printAndSavePerformance()
{
  // DO NOT CHANGE THESE! 
  let accuracy			= parseFloat(hits * 100) / parseFloat(hits + misses);
  let test_time         = (testEndTime - testStartTime) / 1000;
  let time_per_target   = nf((test_time) / parseFloat(hits + misses), 0, 3);
  let penalty           = constrain((((parseFloat(95) - (parseFloat(hits * 100) / parseFloat(hits + misses))) * 0.2)), 0, 100);
  let target_w_penalty	= nf(((test_time) / parseFloat(hits + misses) + penalty), 0, 3);
  let timestamp         = day() + "/" + month() + "/" + year() + "  " + hour() + ":" + minute() + ":" + second();
  
  textFont("Arial", 18);
  background(color(0,0,0));   // clears screen
  fill(color(255,255,255));   // set text fill color to white
  textAlign(LEFT);
  text(timestamp, 10, 20);    // display time on screen (top-left corner)
  
  textAlign(CENTER);
  text("Attempt " + (attempt + 1) + " out of 2 completed!", width/2, 60); 
  text("Hits: " + hits, width/2, 100);
  text("Misses: " + misses, width/2, 120);
  text("Accuracy: " + accuracy + "%", width/2, 140);
  text("Total time taken: " + test_time + "s", width/2, 160);
  text("Average time per target: " + time_per_target + "s", width/2, 180);
  text("Average time for each target (+ penalty): " + target_w_penalty + "s", width/2, 220);

  // Saves results (DO NOT CHANGE!)
  let attempt_data = 
  {
        project_from:       GROUP_NUMBER,
        assessed_by:        student_ID,
        test_completed_by:  timestamp,
        attempt:            attempt,
        hits:               hits,
        misses:             misses,
        accuracy:           accuracy,
        attempt_duration:   test_time,
        time_per_target:    time_per_target,
        target_w_penalty:   target_w_penalty,
  }
  
  // Send data to DB (DO NOT CHANGE!)
  if (RECORD_TO_FIREBASE)
  {
    // Access the Firebase DB
    if (attempt === 0)
    {
      firebase.initializeApp(firebaseConfig);
      database = firebase.database();
    }
    
    // Add user performance results
    let db_ref = database.ref('G' + GROUP_NUMBER);
    db_ref.push(attempt_data);
  }
}

// Mouse button was pressed - lets test to see if hit was in the correct target
function mousePressed() 
{
  // Only look for mouse releases during the actual test
  // (i.e., during target selections)
  if (draw_targets)
  {
    for (var i = 0; i < legendas.getRowCount(); i++)
    {
      // Check if the user clicked over one of the targets
      if (targets[i].clicked(mouseX, mouseY) && mouseButton === LEFT) 
      {

        // Checks if it was the correct target
        if (targets[i].id === trials[current_trial]) {
        targets[i].taken=1;
        hits++;
        }
        else misses++;
        
        current_trial++;              // Move on to the next trial/target
        break;
      }
    }
    
    // Check if the user has completed all trials
    if (current_trial === NUM_OF_TRIALS)
    {
      testEndTime = millis();
      draw_targets = false;          // Stop showing targets and the user performance results
      printAndSavePerformance();     // Print the user's results on-screen and send these to the DB
      attempt++;                      
      
      // If there's an attempt to go create a button to start this
      if (attempt < 2)
      {
        continue_button = createButton('START 2ND ATTEMPT');
        continue_button.mouseReleased(continueTest);
        continue_button.position(width/2 - continue_button.size().width/2, height/2 - continue_button.size().height/2);
      }
    }
    // Check if this was the first selection in an attempt
    else if (current_trial === 1) testStartTime = millis(); 
  }
}

// Evoked after the user starts its second (and last) attempt
function continueTest()
{
  // Re-randomize the trial order
  randomizeTrials();
  
  // Resets performance variables
  hits = 0;
  misses = 0;
  
  current_trial = 0;
  continue_button.remove();
  
  for (var i = 0; i < legendas.getRowCount(); i++){
    targets[i].taken = 0;
  }

  // Shows the targets again
  draw_targets = true; 
}

// Creates and positions the UI targets
function createTargets(target_size, horizontal_gap, vertical_gap)
{
  // Define the margins between targets by dividing the white space 
  // for the number of targets minus one
  // Set targets in a 8 x 10 grid
  for (var legendas_index = 0; legendas_index < legendas.getRowCount(); legendas_index++)
  {     
    // Find the appropriate label and ID for this target
    let target_label = legendas.getString(legendas_index, 0);
    let target_id = legendas.getNum(legendas_index, 1);
    let megatype = 0;
    if (target_id >= 0 && target_id <= 27) { //fruit 3
      megatype = 3;
    } else if (target_id >= 28 && target_id <= 36){ //juice 0 
      megatype = 0;
    } else if ((target_id >= 37 && target_id <= 42) || target_id === 44 || target_id === 47 || target_id === 50 || target_id === 51){ //milk 1
      megatype = 1;
    } else if ((target_id >= 52 && target_id <= 57) || target_id === 43 || target_id === 45 || target_id === 46 || target_id === 48 || target_id === 49){ // milk derivatives 2
      megatype = 2;
    } else if (target_id >= 58 && target_id <= 79){ // vegetables 4
      megatype = 4;
    }
    let target = new Target(target_size, target_label, target_id, megatype);
    targets.push(target); 
  }
  targets.sort((a, b) => {
    const nameA = a.label.toUpperCase();
    const nameB = b.label.toUpperCase();
  
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    return 0; // if names are equal
  });
  targets.sort((a, b) => {
    return a.megatype - b.megatype;
  });

  let h_margin = horizontal_gap / (GRID_COLUMNS + 2);
  let v_margin = vertical_gap / (GRID_ROWS - 1);
  
  //juices
  for (var i = 0; i < 9; i++) {
    let target_x = 40 + (h_margin + target_size) * i + target_size/0.5;        // give it some margin from the left border
    let target_y = (v_margin + target_size) * 0 + target_size/2.5;
    targets[i].x = target_x;
    targets[i].y = target_y + 40;
  }
  
  //milks
  let a = 0;
  for (var i = 9; i < 19; i++) {
    let target_x = 40 + (h_margin + target_size) * a + target_size/0.75;        // give it some margin from the left border
    let target_y = (v_margin + target_size) * 1 + target_size/1.65;

    targets[i].x = target_x;
    targets[i].y = target_y + 40;
    a++;
  }
  
  //yoghurts and creams
  a = 0;
  for (var i = 19; i < 30; i++) {
    let target_x = 40 + (h_margin + target_size) * a + target_size/2;        // give it some margin from the left border
    let target_y = (v_margin + target_size) * 2 + target_size/1.5;

    targets[i].x = target_x;
    targets[i].y = target_y + 40;
    a++;
  }

  //fruits
  a = 0;
  for (var i = 30; i < 41; i++) {
    let target_x = 40 + (h_margin + target_size) * a + target_size/2;        // give it some margin from the left border
    let target_y = (v_margin + target_size) * 3 + target_size/1.2;

    targets[i].x = target_x;
    targets[i].y = target_y + 40;
    a++;
  }
  a = 0;
  for (var i = 41; i < 52; i++) {
    let target_x = 40 + (h_margin + target_size) * a + target_size/2;        // give it some margin from the left border
    let target_y = (v_margin + target_size) * 4 + target_size/1.5;

    targets[i].x = target_x;
    targets[i].y = target_y + 40;
    a++;
  }
  a = 0;
  for (var i = 52; i < 58; i++) {
    let target_x = 40 + (h_margin + target_size) * a + target_size*4;        // give it some margin from the left border
    let target_y = (v_margin + target_size) * 5 + target_size/2;

    targets[i].x = target_x;
    targets[i].y = target_y + 40;
    a++;
  }
  //vegetables
  a = 0;
  for (var i = 58; i < 69; i++) {
    let target_x = 40 + (h_margin + target_size) * a + target_size/2;        // give it some margin from the left border
    let target_y = (v_margin + target_size) * 6 + target_size/2;

    targets[i].x = target_x;
    targets[i].y = target_y + 40;
    a++;
  }
 a = 0;
  for (var i = 69; i < 80; i++) {
    let target_x = 40 + (h_margin + target_size) * a + target_size/2;        // give it some margin from the left border
    let target_y = (v_margin + target_size) * 7 + target_size/3;

    targets[i].x = target_x;
    targets[i].y = target_y + 40;
    a++;
  }
}

function createRectangles(){
  let group_creator = new Group_Creator();
  array_group.push(group_creator);
}


// Is invoked when the canvas is resized (e.g., when we go fullscreen)
function windowResized() 
{    
  if (fullscreen())
  {
    // DO NOT CHANGE THESE!
    resizeCanvas(windowWidth, windowHeight);
    let display        = new Display({ diagonal: display_size }, window.screen);
    PPI                = display.ppi;                      // calculates pixels per inch
    PPCM               = PPI / 2.54;                       // calculates pixels per cm

    // Make your decisions in 'cm', so that targets have the same size for all participants
    // Below we find out out white space we can have between 2 cm targets
    let screen_width   = display.width * 2.54;             // screen width
    let screen_height  = display.height * 2.54;            // screen height
    let target_size    = 2;                                // sets the target size (will be converted to cm when passed to createTargets)
    let horizontal_gap = screen_width - target_size * GRID_COLUMNS;// empty space in cm across the x-axis (based on 10 targets per row)
    let vertical_gap   = screen_height - target_size * GRID_ROWS;  // empty space in cm across the y-axis (based on 8 targets per column)
    
    createRectangles();
    // Creates and positions the UI targets according to the white space defined above (in cm!)
    // 80 represent some margins around the display (e.g., for text)
    createTargets(target_size * PPCM, horizontal_gap * PPCM - 80, vertical_gap * PPCM - 80);

    // Starts drawing targets immediately after we go fullscreen
    draw_targets = true;
  }
}