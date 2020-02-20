package com.ssafy.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


//@RestController //rest하면 화면에라도 index글씨가 찍히긴하네 쩝
@Controller
public class RootController implements ErrorController {
	
	@GetMapping("/error")
	public String redirectRoot() {
		System.out.println("error index redirect");
		return "index";
	}
	
	//@RequestMapping(value= {"/catList"})
	/*
	public String index() {
		System.out.println("index찾기");
		return "index/";
	}
	*/
	
	@Override
	public String getErrorPath() {
		return "/error";
	}

}
