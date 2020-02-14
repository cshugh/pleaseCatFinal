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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.model.dto.comment;
import com.ssafy.model.service.CommentService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RequestMapping("/api/comment")
@RestController
public class CommentRestController {
	
	@Autowired
	private CommentService commentService;
	
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
	
	@ApiOperation("새로운 댓글 정보를 등록한다.")
	@PostMapping("/insert")
	public ResponseEntity<Map<String, Object>> insertComment(@RequestParam int post_no, @RequestParam int user_no, @RequestParam String comment_content) throws Exception{
		commentService.insertComment(post_no, user_no, comment_content);
		return handleSuccess("댓글 등록 완료");
	}
	
	@ApiOperation("댓글 관리번호로 댓글 정보를 찾는다.")
	@GetMapping("/searchComment/{Comment_no}")
	public ResponseEntity<Map<String, Object>> searchComment(@RequestParam int Comment_no) throws Exception{
		return handleSuccess(commentService.searchComment(Comment_no));
	}
	
	@ApiOperation("회원 관리번호로 게시글 정보를 찾는다.")
	@GetMapping("/searchCommentUser/{User_no}")
	public ResponseEntity<Map<String, Object>> searchCommentUser(@RequestParam int User_no) throws Exception{
		return handleSuccess(commentService.searchCommentUser(User_no));
	}
	
	@ApiOperation("게시글 관리번호로 댓글 정보를 찾는다.")
	@GetMapping("/searchCommentPost/{Post_no}")
	public ResponseEntity<Map<String, Object>> searchCommentPost(@RequestParam int Post_no) throws Exception{
		return handleSuccess(commentService.searchCommentPost(Post_no));
	}
	
	@ApiOperation("댓글 정보 삭제")
	@DeleteMapping("/delete/{Comment_no}")
	public ResponseEntity<Map<String, Object>> deleteComment(@RequestParam int Comment_no) throws Exception{
		commentService.deleteComment(Comment_no);
		return handleSuccess(Comment_no+"번 게시글 삭제완료");
	}
	
	@ApiOperation("댓글 수정")
	@PutMapping("/update")
	public ResponseEntity<Map<String, Object>> updateComment(@RequestBody comment Comment) throws Exception{
		commentService.updateComment(Comment);
		return handleSuccess("댓글 정보 수정완료");
	}
	
}
