<script setup lang="ts">
const appTitle = import.meta.env.APP_TITLE;
</script>

<template>
    <div class="login-container w-full h-full image-bg-cover flex-c">
        <div class="login-form-container w-75% h-82% border-rd-32px flex">
            <div class="login-form h-full w-530px p32px">
                <header class="form-header flex">
                    <BaseIcon icon="/logo.svg" type="logo" size="32"></BaseIcon>
                    <div class="header-title font-600 ml line-height-9">{{ appTitle }}</div>
                </header>
                <main class="calc:height-100%-32px flex">
                    <LoginForm></LoginForm>
                </main>
            </div>
            <div class="h-full calc:width-100%-530px p-12px">
                <div class="form-deco h-full w-full image-bg-cover border-rd-32px"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.login-container {
    background-image: url("~/login/login-bg.jpg");

    .login-form-container {
        background-color: var(--colorBgContainer);
    }

    .login-form {
        .form-header {
            .header-title {
                font-size: calc(var(--fontSizeHeading3) * 1px);
            }
        }
    }

    .form-deco {
        background-image: url("~/login/login-form-bg.jpg");
    }
}
</style>
