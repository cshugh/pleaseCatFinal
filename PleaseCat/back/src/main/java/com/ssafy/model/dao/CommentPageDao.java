package com.ssafy.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ssafy.model.dto.comment;
import com.ssafy.model.dto.commentPage;

@Repository
@Mapper
public interface CommentPageDao {
	public List<commentPage> searchCommentPagePost(int no);
}
