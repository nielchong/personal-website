package com.nielchong.login.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12);
	}
	
	@Autowired
	@Qualifier("userDetailsService")
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	@Qualifier("managerDetailsService")
	private ManagerDetailsServiceImpl managerDetailsService;
	
	@Bean
	public AuthenticationProvider userAuthProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	@Bean
	public AuthenticationProvider managerAuthProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(managerDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
		configuration.setAllowCredentials(true);
		configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
	@Bean
	@Order(2)
		public SecurityFilterChain userFilterChain(HttpSecurity http) throws Exception {
		return http.csrf(AbstractHttpConfigurer::disable)
				
				.cors(cors -> cors
                .configurationSource(corsConfigurationSource())
                )

				.sessionManagement((session) -> session
            	.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))

				.authenticationProvider(userAuthProvider())
				.authorizeHttpRequests(authorize -> authorize
					.requestMatchers(
						new AntPathRequestMatcher("/user/register"),
						new AntPathRequestMatcher("/user/login"),
						new AntPathRequestMatcher("/user/session"))
						.permitAll()
					.requestMatchers(
						new AntPathRequestMatcher("/user/info"))
						.hasRole("USER")
					.anyRequest().authenticated()
				)
				.formLogin(form -> form.loginProcessingUrl("/user/login")
				.successHandler((request, response, authentication) -> {
					response.setStatus(HttpServletResponse.SC_OK);
				})
				.failureHandler((request, response, exception) -> {
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.getWriter().write("{\"message\":\"Invalid username or password\"}");
				})
				.permitAll())
				.logout(logout -> logout
				.addLogoutHandler(new CustomLogoutHandler())
				.logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
				.invalidateHttpSession(true)
				.clearAuthentication(true)
				.deleteCookies("JSESSIONID")
				)
        	.build();
		}

	@Bean
	@Order(1)
	public SecurityFilterChain managerFilterChain(HttpSecurity http) throws Exception {
	return http.securityMatcher("/manager/**").csrf(AbstractHttpConfigurer::disable)
			
			.cors(cors -> cors
			.configurationSource(corsConfigurationSource())
			)

			.sessionManagement((session) -> session
			.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))

			.authenticationProvider(managerAuthProvider())
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(
					new AntPathRequestMatcher("/manager/register"),
					new AntPathRequestMatcher("/manager/login"),
					new AntPathRequestMatcher("/session")
					).permitAll()
				.requestMatchers(
					new AntPathRequestMatcher("/manager/info"),
					new AntPathRequestMatcher("/session"))
					.hasRole("MANAGER")
				.anyRequest().authenticated()
			)
			.formLogin(form -> form.loginProcessingUrl("/manager/login")
			.successHandler((request, response, authentication) -> {
				response.setStatus(HttpServletResponse.SC_OK);
			})
			.failureHandler((request, response, exception) -> {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.getWriter().write("{\"message\":\"Invalid username or password\"}");
			})
			.permitAll())
			.logout(logout -> logout
			.addLogoutHandler(new CustomLogoutHandler())
			.logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
			.invalidateHttpSession(true)
			.clearAuthentication(true)
			.deleteCookies("JSESSIONID")
			)
		.build();
	}

}
