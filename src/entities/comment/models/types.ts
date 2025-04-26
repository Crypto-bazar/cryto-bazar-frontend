type Comment = {
  id: number;
  nft_id: number;
  owner_address: string;
  content: string;
  created_at: string;
};

type CommentCreate = {
  content: string;
  owner_address: string;
  token_id: number;
};

export type { Comment, CommentCreate };
