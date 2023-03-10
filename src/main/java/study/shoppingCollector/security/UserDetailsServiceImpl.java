package study.shoppingCollector.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestAttribute;
import study.shoppingCollector.model.dto.User;
import study.shoppingCollector.service.TestService;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    TestService testService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = testService.findByUser(username);
        UserDetailsVO userDetailsVO = new UserDetailsVO();
        userDetailsVO.setId(user.getUser_id());
        userDetailsVO.setEmail(user.getEmail());
        userDetailsVO.setPassword(user.getPw());
        return userDetailsVO;
    }
}
