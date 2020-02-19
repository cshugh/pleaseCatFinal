package com.ssafy.model.service;

import java.util.List; 

import com.ssafy.model.dto.comment;
import com.ssafy.model.dto.detailPostInfo;
import com.ssafy.model.dto.detailPostPage;

public interface DetailPostPageService {
	public List<detailPostPage> searchDetailPostPage(int no);
	public detailPostInfo searchDetailPostInfo(int post_no);

}
