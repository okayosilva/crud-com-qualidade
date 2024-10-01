type UUID = string;

interface Todo {
  id: UUID;
  searchId?: string;
  date: string;
  content: string;
  done: boolean;
}
