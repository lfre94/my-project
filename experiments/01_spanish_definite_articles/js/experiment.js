// set up experiment logic for each slide
function make_slides(f) {
  var slides = {};

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
        "slide_number_in_experiment": exp.phase,
        "id": "example1",
        "felicity_rating": this.felicity,
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
        "slide_number_in_experiment": exp.phase,
        "id": "example2",
        "affect_rating": this.affect,
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
    //checks for an affect rating less than .5 (i.e. label > "muy negativo")
    this.affect = exp.affectPost;
    if ((this.affect != null) && (this.affect < .5)){
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
        "slide_number_in_experiment": exp.phase,
        "id": "example3",
        "affect_rating": this.affect,
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

      // store stimulus data
      this.stim = stim;
      var speaker_name = this.stim.SpeakName;
      var referent_name = this.stim.RefName

      if (stim.TrialType == 'critical') {
      var trial_condition = exp.conditions.pop();
      } else {
      var trial_condition = 'filler'
      };

      console.log('condition:', trial_condition);

      var target_sentence = this.stim[trial_condition+'_target_sentence'];
      console.log('sentence:', target_sentence);


      //handle display of context
      // var contexthtml = stim.Context;
      var contexthtml = this.stim[trial_condition+'_context'];
      console.log('context:', contexthtml);
      $(".case").html(contexthtml);

      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#trial-targetSen").html(target_sentence);
      $("#speaker_name").html(speaker_name);
      $("#referent_name").html(referent_name);
      $("#speaker_name_two").html(speaker_name);
      $(".err").hide();

    },

    // handle click on "Continue" button
    button: function() {
      // this.radio = $("input[name='number']:checked").val();
      // this.strange = $("#check-strange:checked").val() === undefined ? 0 : 1;
      this.felicity = exp.felicityPost;
      this.affect = exp.affectPost;
      if ((this.felicity != null) && (this.affect != null)){
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
        // "item": this.stim.Item,
        // "sentence": this.stim.TargetSentence,
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "felicity_rating": this.felicity,
        "affect_rating" : this.affect,
        "condition" : this.stim.condition,
        // "definite_article": this.stim.DefiniteArticle,
        "referent_name": this.stim.RefName,
        "referent_gender": this.stim.RefGen,
        "speaker_name": this.stim.SpeakName,
        "speaker_gender": this.stim.SpeakGen,

        // "neutralNoCG_DA_context":this.stim.neutralNoCG_DA_context,
        // "neutralNoCG_DA_target_sentence":this.stim.neutralNoCG_DA_target_sentence,
        // "neutralCG_DA_context":this.stim.neutralCG_DA_context,
        // "neutralCG_DA_target_sentence":this.stim.neutralCG_DA_target_sentence,
        // "positive_DA_context":this.stim.positive_DA_context,
        // "positive_DA_target_sentence":this.stim.positive_DA_target_sentence,
        // "negative_DA_context":this.stim.negative_DA_context,
        // "negative_DA_target_sentence":this.stim.negative_DA_target_sentence,

        // "neutralNoCG_noDA_context":this.stim.neutralNoCG_noDA_context,
        // "neutralNoCG_noDA_target_sentence":this.stim.neutralNoCG_noDA_target_sentence,
        // "neutralCG_noDA_context":this.stim.neutralCG_noDA_context,
        // "neutralCG_noDA_target_sentence":this.stim.neutralCG_noDA_target_sentence,
        // "positive_noDA_context":this.stim.positive_noDA_context,
        // "positive_noDA_target_sentence":this.stim.positive_noDA_target_sentence,
        // "negative_noDA_context":this.stim.negative_noDA_context,
        // "negative_noDA_target_sentence":this.stim.negative_noDA_target_sentence,

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
      proliferate.submit(exp.data);
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
    "i0",
    "example1",
    "example2",
    "example3",
    "startExp",
    "trial",
    "subj_info",
    "thanks"
  ];

  exp.data_trials = [];

  exp.conditions = _.shuffle(['neutralNoCG_DA','neutralCG_DA','positive_DA','negative_DA','neutralNoCG_noDA','neutralCG_noDA','positive_noDA','negative_noDA']);

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length();
  //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  $("#start_button").click(function() {
    exp.go();
  });

  exp.go(); //show first slide
}
console.log("hello");
