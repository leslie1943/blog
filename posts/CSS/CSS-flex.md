## Flex

### Flex基本概念
- 在 `flex` 容器中默认存在两条轴, 水平主轴`main axis` 和 垂直的交叉轴 `cross axis`, 这是默认的设置.
- 在 容器中的每个单元块叫`flex item`, 每个项目占据的主轴空间为 `main size`, 占据的交叉轴的空间为`cross size`

![image](https://user-images.githubusercontent.com/13994442/101132920-c83b4100-3642-11eb-9764-454e2a53f3c9.png)

### Flex 容器
- 任何一个容器都可以被指定为 `flex` 布局
```css
.container{
    display: flex | inline-flex; // 可以有这两种取值
}
/* 分别生成块状或者行内的 flex 容器盒子 */
/* 简单说来, 如果你使用块元素如 div, 你就可以使用 flex, 而如果你使用行内元素, 你可以使用 inline-flex */
```
- 当设置`flex`布局之后, 子元素的`float`,`clear`,`vertical-align`的属性就会失效.
- 有 6 种 属性可以设置在容器上. 分别是 `flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `align-items`, `align-content`

#### 🎃 flex-direction: 决定主轴的方向(项目的排列方向)
```css
.container {
    display: flex;
    flex-direction: row | row-reverse | column | column-reverse;
}
```
- `row`: `默认值`, 主轴为水平方向, 起点在左端.

![image](https://user-images.githubusercontent.com/13994442/101133033-f456c200-3642-11eb-8378-ba2ca0072968.png)

- `row-reverse`: 主轴为水平方向, 起点在右端.

![image](https://user-images.githubusercontent.com/13994442/101133375-95de1380-3643-11eb-9084-9053d0615213.png)

- `column`: 主轴为垂直方向,排列方向`top => bottom`
 
![image](https://user-images.githubusercontent.com/13994442/101133924-91fec100-3644-11eb-87c0-b27182f3d911.png)

- `column-reverse`: 主轴为垂直方向,排列方向`bottom => top`

![image](https://user-images.githubusercontent.com/13994442/101133990-ab077200-3644-11eb-94a3-c7f4be4fb0a2.png)


#### 🎃 flex-wrap: 决定容器内项目是否可换行
- 默认情况下,项目都排列在主轴线上, 使用`flex-wrap`可实现项目的换行
```css
.container {
    flex-wrap: nowrap | wrap | wrap-reverse
}
```
- `nowrap` 默认值, 不换行, 当主轴尺寸固定时, 当空间不足时, 项目的尺寸会随之调整而不会挤到下一行

![image](https://user-images.githubusercontent.com/13994442/101134382-3bde4d80-3645-11eb-8a54-20f989c808c7.png)

- `wrap` 换行, 项目主轴总尺寸超出容器时换行, 第一行在上方

![image](https://user-images.githubusercontent.com/13994442/101134487-68926500-3645-11eb-9c3c-411ecb2d2aea.png)

- `wrap-reverse` 换行, 项目主轴总尺寸超出容器时换行, 第一行在下方

![image](https://user-images.githubusercontent.com/13994442/101134533-7ea02580-3645-11eb-9c83-0e36bd37bae0.png)


#### 🎃 flex-flow: flex-direction 和 flex-wrap 的简写形式
- 默认值 `row` || `nowrap`

#### 🎃 justify-content: 定义了项目在主轴的对齐方式
```css
.container {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
- 假设现在`主轴为水平方向`: `flex-direction: row`
- `flex-start`: 左对齐
![image](https://user-images.githubusercontent.com/13994442/101135504-dbe8a680-3646-11eb-9c55-652aedbd2d4e.png)

- `flex-end`: 右对齐
![image](https://user-images.githubusercontent.com/13994442/101135525-e3a84b00-3646-11eb-9dd0-fc7471a51f63.png)

- `center`: 居中
![image](https://user-images.githubusercontent.com/13994442/101135546-ea36c280-3646-11eb-8022-3eeac294b6ab.png)

- `space-between`: 两端对齐, 项目之间的间隔相等, `剩余空间`被等分成间隙.
![image](https://user-images.githubusercontent.com/13994442/101135635-09355480-3647-11eb-958e-7834ccb09ec2.png)

- `space-around`: 每个项目两侧的间隔相等, 所以`项目之间`和`项目与边缘之间`的间隔大一倍
![image](https://user-images.githubusercontent.com/13994442/101135657-0f2b3580-3647-11eb-9c71-782fa5dfce18.png)


#### 🎃 align-items: 定义了项目在交叉轴的对齐方式
```css
.container {
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```
- 假设现在`主轴为水平方向`: `flex-direction: row`
- `stretch`: 默认值, 如果项目未设置高度或者设置为`auto`, 将占满整个容器的高度, 假设容器高度设置为 `100px`, 而项目都没有设置高度的情况下, 则项目的高度也为 `100px`
 
![image](https://user-images.githubusercontent.com/13994442/101136013-a1333e00-3647-11eb-80f0-58624791ec0e.png)

- `flex-start`: 交叉轴的起点对齐(`保证起点对齐`),假设容器高度设置为 100px, 而项目分别为 `20px`, `40px`, `60px`, `80px`, `100px`, 则如图

![image](https://user-images.githubusercontent.com/13994442/101136250-05ee9880-3648-11eb-861f-581c2f59933a.png)

- `flex-end`:交叉轴的终点对齐(`保证终点对齐`), 假设容器高度设置为 100px, 而项目分别为 `20px`, `40px`, `60px`, `80px`, `100px`, 则如图

![image](https://user-images.githubusercontent.com/13994442/101136510-654ca880-3648-11eb-9c15-a59fc7db91b7.png)

- `center`:交叉轴的中点对齐(`保证中间点对齐`), 假设容器高度设置为 100px, 而项目分别为 `20px`, `40px`, `60px`, `80px`, `100px`, 则如图

![image](https://user-images.githubusercontent.com/13994442/101136587-87dec180-3648-11eb-9edd-de41b9f9b63c.png)

- `baseline`:项目的第一行文字的基线对齐, 假设容器高度设置为 100px, 而项目分别为 `20px`, `40px`, `60px`, `80px`, `100px`, 则如图
![image](https://user-images.githubusercontent.com/13994442/101136771-c4122200-3648-11eb-85bd-406554542663.png)
- 以文字的底部为主, 仔细看图理解

#### 🎃 align-content: 定义了多根轴上的对齐方式, 如果项目只有一根轴,那么该属性将不起作用.
- 当`flex-wrap`设置为`nowrap`的时候, 容器仅存在一个轴, 项目不会换行,就不会产生多根轴
- 当`flex-wrap`设置为`wrap`的时候, 容器可能会出现多个轴, 就需要设置多条轴线之间的对齐方式了.
```css
.container {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
- 假设`主轴为水平方向`: `flex-direction: row flex-wrap: wrap`

- `stretch`: 可以看出有三条轴线(因为容器宽度有限), 当值为`stretch`时三条轴线平分容器的垂直方向上的空间
 
![image](https://user-images.githubusercontent.com/13994442/101137979-8c0bde80-364a-11eb-80e5-6c71f6a9445b.png)

- 值得注意的是, 虽然在每条轴线上项目的默认值也为 stretch, 但是由于我每个项目我都设置了高度, 所以它并没有撑开整个容器。如果项目不设置高度的话就会变成下面这样

![image](https://user-images.githubusercontent.com/13994442/101138098-b2ca1500-364a-11eb-9efa-ea8aa8a3fb0c.png)

- `flex-start`: 轴线在交叉轴上的起点对齐
![image](https://user-images.githubusercontent.com/13994442/101138437-266c2200-364b-11eb-959e-d6a2f245544c.png)


- `flex-end`: 轴线在交叉轴上的终点对齐
![image](https://user-images.githubusercontent.com/13994442/101138457-2bc96c80-364b-11eb-9498-75fb1db248d2.png)


- `center`: 轴线在交叉轴上的中间对齐
![image](https://user-images.githubusercontent.com/13994442/101138477-31bf4d80-364b-11eb-8508-d596ad71e01d.png)


- `space-between`: 两端对齐, 之间间隔相等
![image](https://user-images.githubusercontent.com/13994442/101138488-371c9800-364b-11eb-88f1-b21997a4b5e6.png)


- `space-around`: 每个轴线两侧的间隔相等
![image](https://user-images.githubusercontent.com/13994442/101138511-3d127900-364b-11eb-985e-36f1dde2d6b2.png)

