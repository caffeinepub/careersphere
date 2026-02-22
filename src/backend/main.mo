import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  public type QuizResult = {
    selectedStreams : [Text];
    completionPercentage : Nat;
  };

  public type CareerPath = {
    id : Nat;
    title : Text;
    description : Text;
    degreeType : Text;
    professionalRecognition : [Text];
    guaranteedOutcomes : [Text];
    location : Text;
    degreeProgram : Text;
    specializations : [Text];
  };

  public type DegreeProgram = {
    title : Text;
    description : Text;
    durationYears : Nat;
    degreeType : Text;
    accreditedBodies : [Text];
    careerOutcomes : [Text];
    courses : [Course];
    entryRequirements : [Text];
    fees : Nat;
    financialAid : Bool;
  };

  public type Course = {
    title : Text;
    description : Text;
    modules : [ModulePattern];
    durationWeeks : Nat;
    deliveryMode : Text;
    prerequisites : [Text];
    recommendedLearningPath : [Text];
    assessmentMethods : [Text];
  };

  public type ModulePattern = {
    title : Text;
    typeCount : Nat;
    learningObjectives : [Text];
    teachingMethods : [Text];
    assessmentMethods : [Text];
    durationWeeks : Nat;
    practicalComponent : Bool;
    industryInvolvement : Bool;
  };

  public type PatternsCountResponse = {
    theoreticalModules : Nat;
    practicalModules : Nat;
    companyInvolvement : Nat;
  };

  type UserProfile = {
    surveyCompleted : Bool;
    quizResults : [QuizResult];
    bookmarked : Set.Set<Nat>;
  };

  public type UserProfileView = {
    surveyCompleted : Bool;
    quizResults : [QuizResult];
    bookmarked : [Nat];
  };

  var nextCareerId = 5;
  let degreePrograms = Map.empty<Nat, DegreeProgram>();
  let uuidToCareerID = Map.empty<Text, Nat>();
  let careerPaths = Map.empty<Nat, CareerPath>();
  let programsCount = Map.empty<Text, Nat>();
  let profiles = Map.empty<Principal, UserProfile>();

  public shared ({ caller }) func submitQuizResults(selectedStreams : [Text], completionPercentage : Nat) : async () {
    var quizResult : QuizResult = {
      selectedStreams;
      completionPercentage;
    };

    let existingProfile = profiles.get(caller);
    switch (existingProfile) {
      case (?profile) {
        let newQuizResults = profile.quizResults.concat([quizResult]);
        let updatedProfile : UserProfile = {
          surveyCompleted = profile.surveyCompleted;
          quizResults = newQuizResults;
          bookmarked = profile.bookmarked;
        };
        profiles.add(caller, updatedProfile);
      };
      case (null) {
        let newProfile : UserProfile = {
          surveyCompleted = false;
          bookmarked = Set.empty<Nat>();
          quizResults = [quizResult];
        };
        profiles.add(caller, newProfile);
      };
    };
  };

  public shared ({ caller }) func findSimilarCareersByStream(stream : Text) : async [CareerPath] {
    careerPaths.values().toArray();
  };

  public shared ({ caller }) func getUserProfile() : async UserProfileView {
    switch (profiles.get(caller)) {
      case (?profile) {
        {
          surveyCompleted = profile.surveyCompleted;
          quizResults = profile.quizResults;
          bookmarked = profile.bookmarked.toArray();
        };
      };
      case (null) {
        Runtime.trap("User profile not found");
      };
    };
  };

  public shared ({ caller }) func addBookmark(careerId : Nat) : async () {
    let userBookmarks = getUserBookmarks();
    userBookmarks.add(careerId);

    switch (profiles.get(caller)) {
      case (?profile) {
        let updatedProfile : UserProfile = {
          surveyCompleted = profile.surveyCompleted;
          bookmarked = userBookmarks;
          quizResults = profile.quizResults;
        };
        profiles.add(caller, updatedProfile);
      };
      case (null) {
        let newProfile : UserProfile = {
          surveyCompleted = false;
          bookmarked = userBookmarks;
          quizResults = [];
        };
        profiles.add(caller, newProfile);
      };
    };
  };

  public shared ({ caller }) func removeBookmark(careerId : Nat) : async () {
    let currentBookmarks = getUserBookmarks();
    switch (profiles.get(caller)) {
      case (?profile) {
        currentBookmarks.remove(careerId);
        let updatedProfile : UserProfile = {
          surveyCompleted = profile.surveyCompleted;
          bookmarked = currentBookmarks;
          quizResults = profile.quizResults;
        };
        profiles.add(caller, updatedProfile);
      };
      case (null) {
        Runtime.trap("User profile not found");
      };
    };
  };

  func getUserBookmarks() : Set.Set<Nat> {
    switch (profiles.get(Runtime.trap("Not yet implemented"))) {
      case (?profile) { profile.bookmarked };
      case (null) { Set.empty<Nat>() };
    };
  };

  public shared ({ caller }) func getBookmarkedCareers() : async [CareerPath] {
    let userBookmarks = getUserBookmarks();
    let streams = userBookmarks.toArray().map(
      func(careerId) {
        getCareerById(careerId);
      }
    );
    streams;
  };

  func getCareerById(careerId : Nat) : CareerPath {
    switch (careerPaths.get(careerId)) {
      case (?career) { career };
      case (null) { Runtime.trap("Career path not found") };
    };
  };
};
