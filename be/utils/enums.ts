enum VacancyStatus {
  Active = 'active',
  Closed = 'closed'
}
enum VacancyType {
  Web = 'Web',
  Management = 'Management',
  IOS = 'IOS',
  Android = 'Android'
}

enum CandidateRole {
  Candidate = 'candidate',
  Recruiter = 'recruiter',
  Reviewer = 'reviewer'
}

enum Expiration {
  OneDay = '24h',
  ThreeDays = '72h'
}

export {VacancyType, VacancyStatus, CandidateRole, Expiration};
