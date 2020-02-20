package com.ssafy.model.service;

import java.util.List;

import com.ssafy.model.dto.cat;
import com.ssafy.model.dto.user;

public interface Following_catService {
	
	public String searchFollowingCat(int follower_no, int cat_no);
	public List<user> searchFollowerCat(int cat_no);
	public List<cat> searchFollowedCat(int follower_no);
	public void insertFollowingCat(int follower_no, int cat_no);
	public void deleteFollowingCat(int follower_no, int cat_no);

}
