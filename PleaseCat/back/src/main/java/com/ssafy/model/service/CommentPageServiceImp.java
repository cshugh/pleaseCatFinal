package com.ssafy.model.service;

import java.util.List;   

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.model.dao.CommentDao;
import com.ssafy.model.dao.CommentPageDao;
import com.ssafy.model.dto.PleaseCatException;
import com.ssafy.model.dto.comment;
import com.ssafy.model.dto.commentPage;


@Service
public class CommentPageServiceImp implements CommentPageService {
	
	@Autowired
	private CommentPageDao dao;

	//게시글 번호로 댓글들 출력
	@Override
	public List<commentPage> searchCommentPagePost(int no) {
		try { 
			return dao.searchCommentPagePost(no);
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}
}
