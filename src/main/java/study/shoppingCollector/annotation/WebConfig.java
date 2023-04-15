package study.shoppingCollector.annotation;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import study.shoppingCollector.session.LoginUserArgumentResolver;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final QueryStringArgumentResolver argumentResolver;
    private final LoginUserArgumentResolver loginUserArgumentResolver;
    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> argumentResolvers)
    {
        argumentResolvers.add(argumentResolver);
        argumentResolvers.add(loginUserArgumentResolver);
    }
}
