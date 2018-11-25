function addMediaListeners(){
    let mq1 = window.matchMedia('(max-width: 700px)');
    let mq2 = window.matchMedia('(max-width: 1000px) and (min-width: 701px)');
    let mq3 = window.matchMedia('(max-width: 1299px) and (min-width: 1001px)');
    let mq4 = window.matchMedia('(min-width: 1300px)');
    
    function screenTest() {
      if (mq1.matches) {
        videosPerPage = 1; 
      }
      else if(mq2.matches){
        videosPerPage = 2;
      }
      else if(mq3.matches){
        videosPerPage = 3;
      }
      else if(mq4.matches){
        videosPerPage = 4;
      }
      sliderNavigation();
      
    } 
    mq1.addListener(screenTest);
    mq2.addListener(screenTest);
    mq3.addListener(screenTest);
    mq4.addListener(screenTest);
    screenTest();
    }