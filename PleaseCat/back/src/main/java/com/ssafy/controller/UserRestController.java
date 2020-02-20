package com.ssafy.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.model.dto.user;
import com.ssafy.model.service.UserService;

import io.swagger.annotations.ApiOperation;


@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RequestMapping("/api/user")
@RestController
public class UserRestController {
	
	@Autowired
	private UserService userService;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handle(Exception e){
		return handleFail(e.getMessage(), HttpStatus.OK);
	}
	
	public ResponseEntity<Map<String, Object>> handleSuccess(Object data){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", "ok");
		resultMap.put("data", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	public ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus state){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", "fail");
		resultMap.put("data", data);
		return new ResponseEntity<Map<String,Object>>(resultMap, state); 
	}
	
	@ApiOperation("새로운 유저 정보를 입력한다.")
	@PostMapping("/insert")
	public ResponseEntity<Map<String, Object>> insertUser(MultipartFile catImg, @RequestBody user User) throws Exception{
		userService.insertUser(catImg,User);
		return handleSuccess("유저 등록 완료");
	}
	
	@ApiOperation("회원 관리번호로 회원 정보를 찾는다.")
	@GetMapping("/searchUserNo")
	public ResponseEntity<Map<String, Object>> searchUser(@RequestParam int user_no) throws Exception{
		return handleSuccess(userService.searchUser(user_no));
	}
	
	@ApiOperation("회원 이메일로 회원 정보를 찾는다.")
	@GetMapping("/searchUserEmail")
	public ResponseEntity<Map<String, Object>> searchUserEmail(@RequestParam String user_email) throws Exception{
		return handleSuccess(userService.searchUserEmail(user_email));
	}
	
	@ApiOperation("모든 회원 정보를 찾는다.")
	@GetMapping("/searchAll")
	public ResponseEntity<Map<String, Object>> searchAllUser() throws Exception{
		return handleSuccess(userService.searchAllUser());
	}
	
	@ApiOperation("로그인 처리")
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> searchUser(@RequestBody user User) throws Exception{
		return handleSuccess(userService.login(User));
	}
	
	@ApiOperation("회원정보 삭제")
	@DeleteMapping("/delete")
	public ResponseEntity<Map<String, Object>> deleteUser(@RequestParam int user_no) throws Exception{
		userService.deleteUser(user_no);
		return handleSuccess(user_no+"번 회원삭제완료");
	}
	
	@ApiOperation("회원정보를 수정")
	@PutMapping("/update")
	public ResponseEntity<Map<String, Object>> updateUser(@RequestBody user User) throws Exception{
		userService.updateUser(User);
		return handleSuccess("회원 수정완료");
	}
	
	@ApiOperation("토큰을 확인")
	@GetMapping("/checkToken")
	public ResponseEntity<Map<String, Object>> checkToken(@RequestHeader String token) throws Exception{
		return handleSuccess(userService.checkToken(token));
	}
	
	@ApiOperation("새로 저장하려는 고양이의 user_no를 찾는다.")
	@GetMapping("/findUserNo")
	public ResponseEntity<Map<String, Object>> findNextUserNo() throws Exception{
		return handleSuccess(userService.findNextUserNo());
	}
	
	@ApiOperation("새로운 알림 사항을 확인한다.")
	@GetMapping("/searchAlarm")
	public ResponseEntity<Map<String, Object>> searchAlarm(@RequestParam int user_no) throws Exception{
		return handleSuccess(userService.searchAlarm(user_no));
	}
	
	@ApiOperation("새로운 알림 사항을 확인한다.")
	@GetMapping("/readAlarm")
	public ResponseEntity<Map<String, Object>> readAlarm(@RequestParam int post_no) throws Exception{
		return handleSuccess(userService.readAlarm(post_no));
	}	
}
