import Set "mo:core/Set";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Result<S, E> = {
    #ok : S;
    #err : E;
  };

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

  public type UserProfile = {
    surveyCompleted : Bool;
    quizResults : [QuizResult];
    bookmarkedCareers : Set.Set<Nat>;
    bookmarkedDegrees : Set.Set<Nat>;
  };

  public type UserProfileView = {
    surveyCompleted : Bool;
    quizResults : [QuizResult];
    bookmarkedCareers : [Nat];
    bookmarkedDegrees : [Nat];
  };

  public type UserData = {
    principal : Principal;
    profile : UserProfileView;
  };

  private var nextCareerId = 5;
  private let degreePrograms = Map.empty<Nat, DegreeProgram>();
  private let uuidToCareerID = Map.empty<Text, Nat>();
  private let careerPaths = Map.empty<Nat, CareerPath>();
  private let programsCount = Map.empty<Text, Nat>();
  private let profiles = Map.empty<Principal, UserProfile>();

  // Helper function to validate QuizResults
  func validateQuizResults(quizResult : QuizResult) : ?Text {
    if (quizResult.selectedStreams.size() == 0) {
      return ?"Selected streams cannot be empty";
    };
    if (quizResult.completionPercentage > 100) {
      ?"Completion percentage must be between 0 and 100";
    } else {
      null;
    };
  };

  func defaultProfile() : UserProfile {
    {
      surveyCompleted = false;
      quizResults = [];
      bookmarkedCareers = Set.empty<Nat>();
      bookmarkedDegrees = Set.empty<Nat>();
    };
  };

  // Required profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfileView {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };

    switch (profiles.get(caller)) {
      case (?profile) {
        ?{
          surveyCompleted = profile.surveyCompleted;
          quizResults = profile.quizResults;
          bookmarkedCareers = profile.bookmarkedCareers.toArray();
          bookmarkedDegrees = profile.bookmarkedDegrees.toArray();
        };
      };
      case (null) { null };
    };
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfileView {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    switch (profiles.get(user)) {
      case (?profile) {
        ?{
          surveyCompleted = profile.surveyCompleted;
          quizResults = profile.quizResults;
          bookmarkedCareers = profile.bookmarkedCareers.toArray();
          bookmarkedDegrees = profile.bookmarkedDegrees.toArray();
        };
      };
      case (null) { null };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profileView : UserProfileView) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    let bookmarkedCareersSet = Set.empty<Nat>();
    for (careerId in profileView.bookmarkedCareers.vals()) {
      bookmarkedCareersSet.add(careerId);
    };

    let bookmarkedDegreesSet = Set.empty<Nat>();
    for (degreeId in profileView.bookmarkedDegrees.vals()) {
      bookmarkedDegreesSet.add(degreeId);
    };

    let profile : UserProfile = {
      surveyCompleted = profileView.surveyCompleted;
      quizResults = profileView.quizResults;
      bookmarkedCareers = bookmarkedCareersSet;
      bookmarkedDegrees = bookmarkedDegreesSet;
    };

    profiles.add(caller, profile);
  };

  public shared ({ caller }) func submitQuizResults(selectedStreams : [Text], completionPercentage : Nat) : async Result<(), Text> {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit quiz results");
    };

    let quizResult : QuizResult = {
      selectedStreams;
      completionPercentage;
    };

    switch (validateQuizResults(quizResult)) {
      case (?error) { return #err(error) };
      case (null) {};
    };

    let existingProfile = profiles.get(caller);
    let newProfile = switch (existingProfile) {
      case (?profile) {
        let newQuizResults = profile.quizResults.concat([quizResult]);
        {
          profile with quizResults = newQuizResults;
        };
      };
      case (null) {
        let defaultProfile1 = defaultProfile();
        {
          defaultProfile1 with quizResults = [quizResult];
        };
      };
    };
    profiles.add(caller, newProfile);
    #ok(());
  };

  // Public function accessible to all users including guests
  public query ({ caller }) func findSimilarCareersByStream(stream : Text) : async [CareerPath] {
    careerPaths.values().toArray();
  };

  public shared ({ caller }) func addBookmark(careerId : Nat) : async Result<(), Text> {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add bookmarks");
    };

    let existingProfile = profiles.get(caller);
    let userBookmarks = switch (existingProfile) {
      case (?profile) { profile.bookmarkedCareers };
      case (null) { Set.empty<Nat>() };
    };

    userBookmarks.add(careerId);

    let newProfile = switch (existingProfile) {
      case (?profile) {
        {
          profile with bookmarkedCareers = userBookmarks;
        };
      };
      case (null) {
        let defaultProfile1 = defaultProfile();
        {
          defaultProfile1 with bookmarkedCareers = userBookmarks;
        };
      };
    };

    profiles.add(caller, newProfile);
    #ok(());
  };

  public shared ({ caller }) func removeBookmark(careerId : Nat) : async Result<(), Text> {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove bookmarks");
    };

    switch (profiles.get(caller)) {
      case (?profile) {
        profile.bookmarkedCareers.remove(careerId);
        let updatedProfile = {
          profile with bookmarkedCareers = profile.bookmarkedCareers;
        };
        profiles.add(caller, updatedProfile);
        #ok(());
      };
      case (null) { #err("User profile not found") };
    };
  };

  public query ({ caller }) func getBookmarkedCareers() : async [CareerPath] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view bookmarked careers");
    };

    let userBookmarks = switch (profiles.get(caller)) {
      case (?profile) { profile.bookmarkedCareers };
      case (null) { Set.empty<Nat>() };
    };

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

  // Public function accessible to all users including guests
  public query ({ caller }) func getAllCareers() : async [CareerPath] {
    let iter = careerPaths.values();
    iter.toArray();
  };

  public query ({ caller }) func getAllUserProfiles() : async [UserData] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all user profiles");
    };

    profiles.toArray().map(
      func((principal, profile)) {
        {
          principal;
          profile = {
            surveyCompleted = profile.surveyCompleted;
            quizResults = profile.quizResults;
            bookmarkedCareers = profile.bookmarkedCareers.toArray();
            bookmarkedDegrees = profile.bookmarkedDegrees.toArray();
          };
        };
      }
    );
  };

  public shared ({ caller }) func deleteUserProfile(principal : Principal) : async Result<(), Text> {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete user profiles");
    };

    if (profiles.containsKey(principal)) {
      profiles.remove(principal);
      #ok(());
    } else {
      #err("User profile not found");
    };
  };
};
