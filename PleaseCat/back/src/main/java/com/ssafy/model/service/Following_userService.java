package com.ssafy.model.service;

import java.util.List;

import com.ssafy.model.dto.user;


public interface Following_userService {
	
	public String searchFollowingUser(int follower_no, int followed_no);
	public List<user> searchFollowerUser(int follower_no);
	public List<user> searchFollowedUser(int followed_no);
	public void insertFollowingUser(int follower_no, int followed_no);
	public void deleteFollowingUser(int follower_no, int followed_no);

}
