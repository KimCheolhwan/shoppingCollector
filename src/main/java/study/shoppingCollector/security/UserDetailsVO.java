package study.shoppingCollector.security;

import lombok.*;
import lombok.experimental.Delegate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import study.shoppingCollector.model.dto.User;

import java.io.Serializable;
import java.util.Collection;

@RequiredArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class UserDetailsVO implements UserDetails, Serializable {

    private int id;	// DB에서 PK 값
    private String loginId;		// 로그인용 ID 값
    private String password;	// 비밀번호
    private String email;	//이메일
    private boolean emailVerified;	//이메일 인증 여부
    private boolean locked;	//계정 잠김 여부
    private String nickname;	//닉네임
    private Collection<GrantedAuthority> authorities;	//권한 목록

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public int getUserId(){
        return id;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
