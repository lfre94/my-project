// set up experiment logic for each slide
function make_slides(f) {
  var slides = {};

  //bot slide
  slides.bot = slide({
    name : "bot",
    start: function() {
      $('.err1').hide();
      $('.err2').hide();
      $('.disq').hide();
      exp.speaker = _.shuffle(["Hugo", "Pablo", "Sergio", "Alejandro", "Diego", "Carlos", "Ricardo", "Juan", "Lucas", "Felipe"])[0];
      exp.listener = _.shuffle(["Ana", "Victoria", "Camila", "Linda", "Daniela", "Isabella", "Yuri", "Martina", "Marta", "Andrea"])[0];
      exp.lives = 0;
      var story = exp.speaker + ' le dice a ' + exp.listener + ': "Es un día hermoso, ¿no?"'
      var question = '¿Con quién habla ' + exp.speaker + '?';
      document.getElementById("s").innerHTML = story;
      document.getElementById("q").innerHTML = question;
    },
    button : function() {
      exp.text_input = document.getElementById("text_box").value;
      var lower = exp.listener.toLowerCase();
      var upper = exp.listener.toUpperCase();

      if ((exp.lives < 3) && ((exp.text_input == exp.listener)|(exp.text_input == lower) | (exp.text_input== upper))){
        exp.data_trials.push({
          "trial_type": "NA",
          "item_type" : "NA",
          "sentence": "NA",
          "context": "NA",
          "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
          "felicity_rating": "NA",
          "affect_rating" : "NA",
          "condition" : "NA",
          "referent_name": "NA",
          "referent_gender": "NA",
          "speaker_name": "NA",
          "speaker_gender": "NA",
          "addressee_name": "NA",
          "addressee_gender": "NA",      
          "attention_question":"NA",
          "attention_response": "NA",
          "attention_correct_response": "NA",
          "bot_correct_answer": exp.listener,
          "bot_response" : [0, exp.text_input],
        });
        exp.go();
      }
      else {
        exp.data_trials.push({
          "trial_type": "NA",
          "item_type" : "NA",
          "sentence": "NA",
          "context": "NA",
          "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
          "felicity_rating": "NA",
          "affect_rating" : "NA",
          "condition" : "NA",
          "referent_name": "NA",
          "referent_gender": "NA",
          "speaker_name": "NA",
          "speaker_gender": "NA",
          "addressee_name": "NA",
          "addressee_gender": "NA",      
          "attention_question":"NA",
          "attention_response": "NA",
          "attention_correct_response": "NA",
          "bot_correct_answer": exp.listener,
          "bot_response" : [0, exp.text_input],
        });
        if (exp.lives == 0){
          $('.err1').show();
        }if (exp.lives == 1){
          $('.err1').hide();
          $('.err2').show();
        }if (exp.lives == 2){
          $('.err2').hide();
          $('.disq').show();
          $('.button').hide();
        }
        exp.lives++;
      } 
    },
  });


  // set up initial slide
  slides.i0 = slide({
    name: "i0",
    start: function() {
      exp.startT = Date.now();
    }
  });

  // set up the first example slide
  slides.example1 = slide({
    name: "example1",

    // this is executed when the slide is shown
    start: function() {
      // hide error message and call sliders
      $('.err').hide();

      this.init_sliders();

    },

    // this is executed when the participant clicks the "Continue button"
    button: function() {
      exp.go();
    },

    button: function() {
      //checks for a felicity rating less than .5 (i.e. label > "muy raro")
      this.felicity = exp.felicityPost;
      if ((this.felicity != null) && (this.felicity < .5)){
        this.log_responses();
        exp.go(); //use exp.go() if and only if there is no "present"ed data, ie no list of stimuli.
      } else {
        $('.err').show();
      }
    },


    // this initializes the slider
    init_sliders : function() {
      utils.make_slider("#felicity_slider_ex_one", function(event,ui) {
        exp.felicityPost = ui.value;
      });
    },


    log_responses: function() {
      // add response to exp.data_trials
      // this data will be submitted at the end of the experiment
      exp.data_trials.push({

        "trial_type":"example1",
        "item_type" : "example1",
        "sentence": "“Pilar, también trae las galletas.”",
        "context": "Karlita tiene 10 años y está viendo la televisión con su madre, Pilar. Su mamá se levanta y va a la cocina a traer comida. Karlita le dice:",
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "felicity_rating": this.felicity,
        "affect_rating" : "NA",
        "condition" : "felicity_test",
        "referent_name": "Pilar",
        "referent_gender": "fem",
        "speaker_name": "Karlita",
        "speaker_gender": "fem",
        "addressee_name": "Pilar",
        "addressee_gender": "fem",      
        "attention_question":"NA",
        "attention_response": "NA",
        "attention_correct_response": "NA",
        "bot_correct_answer": "NA",
        "bot_response" : "NA",

      });
    },
  });

  // set up slide for second example trial
  slides.example2 = slide({
    name: "example2",

// this is executed when the slide is shown
    start: function() {
      // hide error message and call sliders
      $('.err').hide();

      this.init_sliders();

    },

    // this is executed when the participant clicks the "Continue button"
    button: function() {
      exp.go();
    },

    button: function() {
    //checks for an affect rating greater than .5 (i.e. label > "muy positivo")  
      this.affect = exp.affectPost;
      if ((this.affect != null) && (this.affect > .5)){
        this.log_responses();
        exp.go();
      } else {
        $('.err').show();
      }
    },


    // this initializes the slider
    init_sliders : function() {
      utils.make_slider("#affect_slider_ex_two", function(event, ui) {
        exp.affectPost = ui.value;
      });
    },


    log_responses: function() {
      // add response to exp.data_trials
      // this data will be submitted at the end of the experiment
      exp.data_trials.push({

        "trial_type":"example2",
        "item_type" : "example2",
        "sentence": "“Corazoncito, también trae las galletas.”",
        "context": "Ahora Pilar está viendo la televisión con su esposo, Marcel. Él se levanta y va a la cocina a traer comida. Pilar le dice:",
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "felicity_rating": "NA",
        "affect_rating" : this.affect,
        "condition" : "positive_affect_test",
        "referent_name": "Marcel",
        "referent_gender": "masc",
        "speaker_name": "Pilar",
        "speaker_gender": "fem",
        "addressee_name": "Marcel",
        "addressee_gender": "masc",
        "attention_question":"NA",
        "attention_response": "NA",
        "attention_correct_response": "NA",
        "bot_correct_answer": "NA",
        "bot_response" : "NA",

      });
    },
  });

  // set up slide for third example trial

  slides.example3= slide({
    name: "example3",

    start: function() {
      // hide error message and call sliders
      $(".err").hide();
      this.init_sliders();
    },

    // handle button click
    button: function() {

    exp.attention = $('input[name="attn_check_example"]:checked').val();
    //checks for an affect rating less than .5 (i.e. label > "muy negativo")
    this.affect = exp.affectPost;
    if ((this.affect != null) && (this.affect < .5) && (exp.attention == "True")){
      this.log_responses();
      exp.go();
    } else {
      $('.err').show()
    }
  },

    init_sliders : function() {
      utils.make_slider("#affect_slider_ex_three", function(event, ui) {
        exp.affectPost = ui.value;
      });
    },


    log_responses: function() {
      exp.data_trials.push({

        "trial_type":"example3",
        "item_type" : "example3",
        "sentence": "“Ese tonto estará allí.”",
        "context": "Pilar le está platicando a Marcel sobre un colega, que se llama Marco Antonio. Él la fastidia mucho. Marcel le pregunta a Pilar si Marco Antonio viene a la reunión laboral mañana. Pilar le responde:",
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "felicity_rating": "NA",
        "affect_rating" : this.affect,
        "condition" : "negative_affect_test",
        "referent_name": "Marco Antonio",
        "referent_gender": "masc",
        "speaker_name": "Pilar",
        "speaker_gender": "fem",
        "addressee_name": "Marcel",
        "addressee_gender": "masc",
        "attention_question":"Marcel sabe que Marco Antonio trabaja con Pilar.",
        "attention_response": exp.attention,
        "attention_correct_response": "True",
        "bot_correct_answer": "NA",
        "bot_response" : "NA",

      });
    },
  });

  // set up slide with instructions for main experiment
  slides.startExp = slide({
    name: "startExp",
    start: function() {
    },
    button: function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.trial = slide({
    name: "trial",

    // To rotate through stimulus list, comment out the above 7 lines and  uncomment the following 2:
    present: exp.stimuli,
    present_handle : function(stim) {

      this.init_sliders();
      exp.affectPost = null;
      exp.felicityPost = null;
      $('input[name="attn_check"]').prop("checked", false);

      // store stimulus data
      this.stim = stim;
      var speaker_name = this.stim.SpeakName;
      var referent_name = this.stim.RefName;
      var addressee_name = this.stim.AddName;
      var attention_question = this.stim.AttnQuestion;

      if (stim.TrialType == 'critical') {
      var trial_condition = exp.conditions.pop();
      exp.condition_save = trial_condition
      } else {
      var trial_condition = 'filler'
      exp.condition_save = this.stim.condition
      };
      console.log('***')
      console.log('item:', this.stim.ItemType)
      console.log('condition:', trial_condition);

      exp.target_sentence = this.stim[trial_condition+'_target_sentence'];
      console.log('sentence:', exp.target_sentence);


      //handle display of context
      // var contexthtml = stim.Context;
      exp.contexthtml = this.stim[trial_condition+'_context'];
      console.log('context:', exp.contexthtml);
      $(".case").html(exp.contexthtml);

      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#trial-targetSen").html(exp.target_sentence);
      $("#speaker_name").html(speaker_name);
      $("#referent_name").html(referent_name);
      $("#addressee_name").html(addressee_name);
      $("#speaker_name_two").html(speaker_name);
      $("#referent_name_two").html(referent_name);
      $("#attention_question").html(attention_question);

      $(".err").hide();

    },

    // handle click on "Continue" button
    button: function() {
      // this.radio = $("input[name='number']:checked").val();

      this.felicity = exp.felicityPost;
      this.affect = exp.affectPost;
      exp.attention = $('input[name="attn_check"]:checked').val();

      if ((this.felicity != null) && (this.affect != null) && (exp.attention)){
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this) if there is a list of "present" stimuli to rotate through
      } else {
        $('.err').show();
      }
    },

    init_sliders : function() {
      utils.make_slider("#affect_slider", function(event, ui) {
        exp.affectPost = ui.value;
      });
      utils.make_slider("#felicity_slider", function(event,ui) {
        exp.felicityPost = ui.value;
      });
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "trial_type":this.stim.TrialType,
        "item_type" : this.stim.ItemType,
        "sentence": exp.target_sentence,
        "context": exp.contexthtml,
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "felicity_rating": this.felicity,
        "affect_rating" : this.affect,
        "condition" : exp.condition_save,
        "referent_name": this.stim.RefName,
        "referent_gender": this.stim.RefGen,
        "speaker_name": this.stim.SpeakName,
        "speaker_gender": this.stim.SpeakGen,
        "addressee_name": this.stim.AddName,
        "addressee_gender": this.stim.AddGen,
        "attention_question":this.stim.AttnQuestion,
        "attention_response": exp.attention,
        "attention_correct_response": this.stim.AttnCorrect,
        "bot_correct_answer": "NA",
        "bot_response" : "NA",

      });
    },
  });

  // slide to collect subject information
  slides.subj_info = slide({
    name: "subj_info",
    
    start: function(){
      
      $('.err').hide();

    },

    submit: function(e) {

      if (($("#gender").val()) && ($("#age").val()) && ($("#language").val()) && ($("#education").val()) && 
        ($("#region").val()) && ($("#reported_usage").val()) && ($("#reported_familiarity").val())) {

      exp.subj_data = {
        gender: $("#gender").val(),
        age: $("#age").val(),
        education: $("#education").val(),
        language: $("#language").val(),
        region: $("#region").val(),
        places_lived: $("#places_lived").val(),
        reported_usage: $("#reported_usage").val(),
        usage_description: $("#usage_description").val(),
        reported_familiarity: $("#reported_familiarity").val(),
        language_attitude: $("#language_attitude").val(),
        asses: $('input[name="assess"]:checked').val(),
        enjoyment: $("#enjoyment").val(),
        fairprice: $("#fairprice").val(),
        comments: $("#comments").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    } else {

      $('.err').show();

    }

  }
  });

  //
  slides.thanks = slide({
    name: "thanks",
    start: function() {
      exp.data = {
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "condition": exp.condition,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// initialize experiment
function init() {

  exp.trials = [];
  exp.catch_trials = [];
  var stimuli = all_stims;

  exp.stimuli = _.shuffle(stimuli); //call _.shuffle(stimuli) to randomize the order;

  console.log(exp.stimuli)
  exp.n_trials = exp.stimuli.length;

  // exp.condition = _.sample(["context", "no-context"]); //can randomize between subjects conditions here

  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };

  //blocks of the experiment:
  exp.structure = [
    "bot",
    "i0",
    // "sound_test",
    "example1",
    "example2",
    "example3",
    "startExp",
    "trial",
    "subj_info",
    "thanks"
  ];

  exp.data_trials = [];

  exp.conditions = _.shuffle(['neutralNoCG_DA','neutralCG_DA','positive_DA','negative_DA','neutralNoCG_noDA','neutralCG_noDA','positive_noDA','negative_noDA','neutralNoCG_DA','neutralCG_DA','positive_DA','negative_DA','neutralNoCG_noDA','neutralCG_noDA','positive_noDA','negative_noDA','neutralNoCG_DA','neutralCG_DA','positive_DA','negative_DA','neutralNoCG_noDA','neutralCG_noDA','positive_noDA','negative_noDA']);

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length();
  //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

   //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });


  exp.go(); //show first slide
}
console.log("hello");
