package com.ssafy.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

// @Configuration 애노테이션을 붙여 이 class 파일이 구성 파일임을 선언
@Configuration
//@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	                                                      
	/* 이걸 써줘야하나 ? 뭔지싶다 이거
	 private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
			    "classpath:/META-INF/resources/",
			"classpath:/resources/",
			    "classpath:/static/",
			"classpath:/public/"
			};
			*/

	private String uploadImagesPath;
	
	//@Value : application.properties에 설정한 이미지 업로드 경로에 관란 프로퍼티 값을 가져온다.
	//  D:/FinalGitCat/PleaseCat/back/src/main/resources/static/images/ (\백슬래쉬 주먼 안됨)
	//  그리고 properties에 값 넣어줄때 '' 주면 안됨
	public WebConfig(@Value("${custom.path.upload-images}") String uploadImagesPath) {
		this.uploadImagesPath = uploadImagesPath;
	}
	

	  public void addCorsMappings(CorsRegistry registry) {
		  
	        // 일단 모두 해제 상태로 개발하다가 추후 클라이언트의 접근 URL 기준으로 조정
	       // registry.addMapping("/**");
	    }


	
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		// addResourceLocations에 url경로를 설정하고, 
		// addResourceLocations에 매핑될 리소스 위치를 설정한다.(경로앞에 file:///을 반드시 붙여줄것)
		/*
		registry.addResourceHandler("static/swagger-ui.html")
		.addResourceLocations("classpath:/METH-INF/resources/");
		 registry
	        .addResourceHandler("/webjars/**")
	        .addResourceLocations("classpath:/META-INF/resources/webjars/");
	        */
		 
		
		// index.html을 찾기 위한 리소스 로케이션 등록, 
		// "/"로 index.html을 매핑해줘서 해당 파일 이름과 같은걸 static밑으로가서 찾으라는 handler
		/*
		 if (!registry.hasMappingForPattern("/**")) {
			 System.out.println("Wlrglsi?>");
		      registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
		    }
		  */
		

		
		/*
		 * 즉, /static/image/email/나, static/image/etc/로 시작되는 url pattern은 
		 * 일반적인 정적 파일 경로가 아닌 우리가 별도로 설정한 파일 업로드 경로인 ~
		 * 폴더내에 있는 리소스를 가리키도록 하는 것
		 */
		List<String> imageFolders = Arrays.asList("cat","post","user","icon");
		for(String imageFolder : imageFolders) {
			registry.addResourceHandler("/static/images/"+imageFolder+"/**")
			.addResourceLocations("file:///"+uploadImagesPath+imageFolder+"/")
			.setCachePeriod(3600)
			.resourceChain(true)
			.addResolver(new PathResourceResolver());
		}
	}

	
	// "/"를 index.html로 넘겨주겠다는 뜻
	// 이거없어도 static 밑에 넣어놔서 알아서 찾아감.
	 public void addViewControllers(ViewControllerRegistry registry) {
		    // **NOTE: forward도 redirect도 안먹힘
		    //registry.addRedirectViewController("/", "/index.html");
		  }

	
	
}
