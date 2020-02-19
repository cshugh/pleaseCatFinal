package com.ssafy.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ssafy.model.dto.detailPostInfo;
import com.ssafy.model.dto.detailPostPage;

@Repository
@Mapper
public interface DetailPostPageDao {
	public List<detailPostPage> searchDetailPostPage(int no);
	public detailPostInfo searchDetailPostInfo(int post_no);
}
