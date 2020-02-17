package com.ssafy.model.service;

import java.util.List;   

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.model.dao.CommentDao;
import com.ssafy.model.dao.DetailPostPageDao;
import com.ssafy.model.dto.PleaseCatException;
import com.ssafy.model.dto.comment;
import com.ssafy.model.dto.detailPostPage;


@Service
public class DetailPostPageServiceImp implements DetailPostPageService {
	
	@Autowired
	private DetailPostPageDao dao;

	//게시글 번호로 댓글들 출력
	@Override
	public List<detailPostPage> searchDetailPostPage(int no) {
		try { 
			return dao.searchDetailPostPage(no);
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}
}
