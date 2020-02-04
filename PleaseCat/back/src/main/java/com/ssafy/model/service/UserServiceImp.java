package com.ssafy.model.service;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.model.dao.UserDao;
import com.ssafy.model.dto.PleaseCatException;
import com.ssafy.model.dto.user;
import com.ssafy.security.JwtTokenProvider;

@Service
public class UserServiceImp implements UserService {
	@Autowired
	private UserDao dao;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	@Autowired
	private PasswordEncoder passwordEncoder;

	//회원번호로 회원검색
	public user searchUser(int no) {
		try { 
			user User = dao.searchUser(no);
			if(User == null) {
				throw new PleaseCatException("찾으려는 정보가 없습니다");
		
			} else {
				return User;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}
	
	//회원이메일로 회원검색
	public user searchUserEmail(String user_email) {
		try { 
			user User = dao.searchUserEmail(user_email);
			if(User == null) {
				throw new PleaseCatException("찾으려는 정보가 없습니다");
			} else {
				return User;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}

	
	//회원가입을 통한 회원추가
	public void insertUser(user User) {
		try {
			user find = dao.searchUserEmail(User.getUser_email());
			if(find != null) {
				throw new PleaseCatException();
			}else {
				String pw = passwordEncoder.encode(User.getUser_pw());
				User.setUser_pw(pw);
				dao.insertUser(User);
				System.out.println("user 입력 성공");
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}


	//회원정보 수정
	@Override
	public void updateUser(user User) {
		try {
			searchUser(User.getUser_no());
			dao.updateUser(User);
			System.out.println("user 업데이트 성공");
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
		
	}


	//회원정보 삭제
	@Override
	public void deleteUser(int no) {
		try {
			searchUser(no);
			dao.deleteUser(no);
			System.out.println(no+"번 user 삭제를 완료했습니다.");
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException();
		}
	}


	//전체회원 목록 출력
	@Override
	public List<user> searchAllUser() {
		try { 
			return dao.searchAllUser();
		} catch (Exception e) {
			e.printStackTrace();
			throw new PleaseCatException("회원 전체 목록을 불러오는데 실패했습니다.");
		}
	}
	
	//회원 로그인
	public String login(String user_email, String user_pw){
		try {
			user find = searchUserEmail(user_email);
				if(!passwordEncoder.matches(user_pw, find.getUser_pw()))
					throw new PleaseCatException("비밀 번호 오류");
				return jwtTokenProvider.createToken(user_email,null);	
				//return jwtTokenProvider.createToken(user_email, roles); 아직 권한 기능은 못쓰니 구현을 하지않았다
				
		} catch (Exception e) {
			throw new PleaseCatException();
		}
	
	}
}
