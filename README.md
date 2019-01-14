# Page Design 
## 主要目的是用React实现一个邮件模板编辑器
 灵感（或者说需求）来源于EmailHQ项目，该项目目前使用的邮件模板编辑器是[GrapesJS][1]，GrapesJS是一个开源的、多用途的Web Builder框架，它结合了不同的工具和特性，目的是帮助用户在不了解任何编码的情况下构建HTML模板。它是替换普通所见即所得编辑器的完美解决方案，这些编辑器适合于内容编辑，但不适用于创建HTML结构。但是其功能太过复杂，需要进行定制的内容太多，所有使用体验不是很好（过于复杂且专业）。
 
 基于此，我萌生出想用React实现一个邮件模板编辑器的想法，参照原型为[unlayer][2]，这是一个商业软件，基于服务收费。
 
 该项目完成后，能应用于多个有此需求场景的公司项目中。
### 由于开源，还可以直接拉分支开发新需求！

  [1]: https://grapesjs.com/
  [2]: https://unlayer.com/

  ## 使用说明
  ### 属性
|   属性名        |     功能    |
|   --------   |    -----:    |
|   imageUploadUrl     |     提供图片上传地址  |

  ### 回调方法
|   方法名        |     功能    |   参数    |   返回值    |
|   --------   |    -----:    |   -----   |   -----     |
|   ref     |     用于获取编辑器instance  |     编辑器instance    |   无    |
|   onUpload     |     图片上传完成处理数据格式  |    服务端返回的数据    |   实际图片地址    |
|   onUploadError     |     捕获图片上传失败异常信息  |   error: { message, errorStack }  |   无  |

  ### instance方法
|   方法名        |     功能    |   参数    |   返回值    |
|   --------   |    -----:    |   -----   |   -----     |
|   export     |     将当前内容转换成html导出  |     无    |   html内容    |
|   getData     |     获取当前内容的原始数据rawData  |    无    |   rawData    |
|   setData     |     将原始数据设置回编辑器  |   rawData  |   无  |