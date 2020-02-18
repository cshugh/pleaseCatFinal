package com.ssafy.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.model.dao.Following_userDao;
import com.ssafy.model.dao.UserDao;
import com.ssafy.model.dto.PleaseCatException;
import com.ssafy.model.dto.following_user;
import com.ssafy.model.dto.user;


@Service
public class Following_userServiceImp implements Following_userService {

	@Autowired
	private Following_userDao followUserDao;
	@Autowired
	private UserDao userDao;
	
	HashMap<String, Object> map;
	
	public String searchFollowingUser(int follower_no, int followed_no) {
		try {
			map = new HashMap<String, Object>();
			map.put("follower_no", follower_no);
			map.put("followed_no", followed_no);
			
			following_user find = followUserDao.searchFollowingUser(map);
			
			if(find==null) {
				return "execute";
			}else {
				return "cancel";
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException("팔로잉 탐색중 오류");
		}
	}
	
	//자신이 팔로잉하는 회원목록들 출력
	@Override
	public List<user> searchFollowerUser(int follower_no) {
		try {
			List<Integer> list = followUserDao.searchFollowerUser(follower_no);
			if(list==null) {
				throw new PleaseCatException("당신이 팔로잉하는 사람이 없습니다.");
			}else {
				List<user> result = new ArrayList<user>();
				for (Integer i : list) {
					user u = userDao.searchUser(i.intValue());
					result.add(u);
				}
				return result;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException("팔로잉 탐색중 오류");
		}
	}
	
	//자신을 팔로잉하는 회원목록들 출력
	@Override
	public List<user> searchFollowedUser(int followed_no) {
		try {
			List<Integer> list = followUserDao.searchFollowedUser(followed_no);
			if(list==null) {
				throw new PleaseCatException("당신을 팔로잉하는 사람이 없습니다.");
			}else {
				List<user> result = new ArrayList<user>();
				for (Integer i : list) {
					user u = userDao.searchUser(i.intValue());
					result.add(u);
				}
				return result;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException("팔로잉 탐색중 오류");
		}
	}

	//팔로우 하기
	@Override
	public void insertFollowingUser(int follower_no, int followed_no) {
		try {
			String answer = searchFollowingUser(follower_no, followed_no);
			if(answer=="execute") {
				map = new HashMap<String, Object>();
				map.put("follower_no", follower_no);
				map.put("followed_no", followed_no);
				followUserDao.insertFollowingUser(map);
				System.out.println("팔로우 누를게요~");
			}else {
				throw new PleaseCatException("이미 팔로우 눌렀습니다.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException("팔로우 실행중 오류");
		}
	}

	//팔로우 취소
	@Override
	public void deleteFollowingUser(int follower_no, int followed_no) {
		try {
		String answer = searchFollowingUser(follower_no, followed_no);
		if(answer=="cancel") {
			map = new HashMap<String, Object>();
			map.put("follower_no", follower_no);
			map.put("followed_no", followed_no);
			followUserDao.deleteFollowingUser(map);
			System.out.println("팔로잉 취소합니다.");
		}else {
			throw new PleaseCatException("팔로잉을 먼저 하세요");
			}
		} catch (Exception e) {
		e.printStackTrace();
		throw new PleaseCatException("팔로우 실행중 오류");
		}
	}
}
