export interface Article {
  id: number;
  title: string;
  body: string;
  category: string;
  submitted_by: number;
  created_at: Date;
}

export interface articlesWithUser extends Article {
    email: string;
}
