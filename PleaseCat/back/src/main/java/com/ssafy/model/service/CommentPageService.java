package com.ssafy.model.service;

import java.util.List; 

import com.ssafy.model.dto.comment;
import com.ssafy.model.dto.commentPage;

public interface CommentPageService {
	public List<commentPage> searchCommentPagePost(int no);
}
