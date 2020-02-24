package com.ssafy.model.service;

import java.util.HashMap;
import java.util.List;   

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.model.dao.CommentDao;
import com.ssafy.model.dto.PleaseCatException;
import com.ssafy.model.dto.comment;


@Service
public class CommentServiceImp implements CommentService {
	
	@Autowired
	private CommentDao dao;
	
	HashMap<String, Object> map;

	//댓글 번호로 1개 검색
	@Override
	public comment searchComment(int no) {
		try { 
			comment find = dao.searchComment(no);
			if(find == null) {
				throw new PleaseCatException("찾으려는 정보가 없습니다");
		
			} else {
				return find;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}

	//회원번호로 댓글들 출력
	@Override
	public List<comment> searchCommentUser(int no) {
		try { 
			List<comment> finds = searchCommentUser(no);
			return finds;
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}

	//게시글 번호로 댓글들 출력
	@Override
	public List<comment> searchCommentPost(int no) {
		try { 
			return dao.searchCommentPost(no);
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}

	//댓글입력
	@Override
	public void insertComment(int post_no, int user_no, String comment_content) {
		try {
				map = new HashMap<String, Object>();
				map.put("post_no", post_no);
				map.put("user_no", user_no);
				map.put("comment_content", comment_content);
				dao.insertComment(map);
				System.out.println("댓글 입력 성공");
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}

	//댓글 수정
	@Override
	public void updateComment(comment comment) {
		try {
			searchComment(comment.getComment_no());
			dao.updateComment(comment);
			System.out.println("댓글 업데이트 성공");
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}

	//댓글삭제
	@Override
	public void deleteComment(int no) {
		try {
			searchComment(no);
			dao.deleteComment(no);
			System.out.println(no+"번 댓글 삭제를 완료했습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}	
	}

}
