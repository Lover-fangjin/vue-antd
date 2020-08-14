
/**
 * 生成广告牌POI点方法
 * @param {*} _viewer 
 * @param {*} name 
 * @param {*} data 
 */
export function drawBillboard(_viewer, name, data, type='poi', height=800){
    let billboards = new Cesium.BillboardCollection();
    billboards.name= name;
    billboards.type = type;
    _viewer.scene.primitives.add(billboards);
    try{
        data.map((item, index) => {
            let _h = item.hasOwnProperty('height') ? item.height : height;
            billboards.add({
                id: item.id.toString(),
                name: item.name,
                width : 32,
                height : 32, 
                image : item.imgUrl,
                pixelOffset: new Cesium.Cartesian2(0, 32),
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                position : Cesium.Cartesian3.fromDegrees(parseFloat(item.lng), parseFloat(item.lat), parseFloat(_h)),
            });
        });
    }catch (err){
        console.log("catch error: ", err);
    }
    return billboards;
}

/**
 * 清除广告牌POI点方法
 * @param {*} name 
 */
export let clearBillboard = (_viewer, name) => {
    let primitives = _viewer.scene.primitives;
    primitives._primitives.map((item, index)=>{
        if( item.name === name){
            primitives.remove(primitives.get(index));
        }
    });
}

export let getParentEnitty = (_viewer, _group) => {
    let entities = _viewer.entities.values;
    let entity = null;
    entities.map(item => {
        if(item.hasOwnProperty('group') && item.group === _group){
            entity =  item;
            return;
        }
    });
    return entity;
}

/**
 * 创建实体POI
 * @author hejin 2019-9-4
 * @param {*} _viewer 
 * @param {id, name, imgUrl, lat, lng, height} infos
 */
export let drawEntityPoi = (_viewer, infos) => {
    let _entities = [], x=1, flog=true;
    try{
        infos.map(info => {
            let parent = getParentEnitty(_viewer, info.group);
            _entities = _viewer.entities.add({
                id: info.id.toString(),
                type: info.hasOwnProperty('type') ?  info.type : 'poi',
                name: info.name,
                parent: parent,
                imgs: info.imgs,
                position: Cesium.Cartesian3.fromDegrees(parseFloat(info.lng), parseFloat(info.lat), parseFloat(info.height)),
                // point: { //点
                //     pixelSize: 0,
                //     HeightReference: info.height
                // },
                label: { //文字标签
                    text: info.name,
                    font : '12pt monospace',
                    style : Cesium.LabelStyle.FILL_AND_OUTLINE,
                    fillColor: new Cesium.Color(255/255, 255/255, 255/255, 1),
                    outlineColor: new Cesium.Color(1, 1, 1, 0),
                    outlineWidth : 0,
                    showBackground: true,
                    backgroundColor: new Cesium.Color(0, 0, 0, 0),
                    backgroundPadding: new Cesium.Cartesian2(5, 3),
                    pixelOffset : new Cesium.Cartesian2( 0, -40 ),   //偏移量
                    // horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    // verticalOrigin : Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1, 1000000)
                },
                billboard: { //图标
                    name: info.name,
                    width: 24,
                    height: 24,
                    image : info.imgs.defaultImg,
                    pixelOffset: new Cesium.Cartesian2(0, 0),
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                },
                // point : {
                //     show : info.pShow, // default
                //     color :new Cesium.CallbackProperty(() => {
                //         if(flog){
                //             x=x-0.001;
                //             if(x<=0){
                //                 flog=false;
                //             }
                //         }else{
                //             x=x+0.001;
                //             if(x>=.25){
                //                 flog=true;
                //             }
                //         }
                //         return Cesium.Color.RED.withAlpha(x);
                //     },false),
                //     pixelSize : 20, // default: 1
                //     outlineWidth :0
                // }
            });
        });
    }catch (err){
        console.log("drawEntityPoi error: ", err);
    }
    return _entities;
}

export let drawEntityPoiSingle = (_viewer, info) => {
    return new Promise((resovle, reject) => {
        let parent = getParentEnitty(_viewer, info.group);
        let entity = _viewer.entities.add({
            id: info.id.toString(),
            type: info.hasOwnProperty('type') ?  info.type : 'poi',
            name: info.name,
            parent: parent,
            imgs: info.imgs,
            position: Cesium.Cartesian3.fromDegrees(parseFloat(info.lng), parseFloat(info.lat), parseFloat(info.height)),
            label: { //文字标签
                text: info.name,
                font : '12pt monospace',
                style : Cesium.LabelStyle.FILL_AND_OUTLINE,
                fillColor: new Cesium.Color(255/255, 255/255, 255/255, 1),
                outlineColor: new Cesium.Color(1, 1, 1, 0),
                outlineWidth : 0,
                showBackground: true,
                backgroundColor: new Cesium.Color(0, 0, 0, 0),
                backgroundPadding: new Cesium.Cartesian2(7, 5),
                pixelOffset : new Cesium.Cartesian2( 0, -40 ),   //偏移量
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1, 1000000)
            },
            billboard: { //图标
                name: info.name,
                width: 24,
                height: 24,
                image : info.imgs.defaultImg,
                pixelOffset: new Cesium.Cartesian2(0, 0),
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
        });
        resovle(entity);
    })
}

/**
 * 创建实体文字
 * @param {*} _viewer 
 * @param {*} name 
 * @param {*} infos 
 */
export let drawEntiityLabel = (_viewer, name, infos) => {
    let _entities = [];
    try{
        infos.map(info => {
            _viewer.entities.add({
                id: info.id.toString(),
                name: name,
                position: Cesium.Cartesian3.fromDegrees(parseFloat(info.lng), parseFloat(info.lat), parseFloat(info.height)),
                // point: { //点
                //     pixelSize: 0,
                //     HeightReference: 1000
                // },
                label: { //文字标签
                    text: info.name,
                    font : '12pt monospace',
                    style : Cesium.LabelStyle.FILL_AND_OUTLINE,
                    fillColor: new Cesium.Color(1, 1, 1, 1),
                    showBackground: true,
                    backgroundColor: new Cesium.Color(1, 1, 1, 0.1),
                    backgroundPadding: new Cesium.Cartesian2(7, 5),
                    pixelOffset : new Cesium.Cartesian2( 0, -10 ),   //偏移量
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1, 10000)
                }
            });
        });
    }catch (err){
        console.log("drawEntityPoi error: ", err);
    }
    return _entities;
}

/**
 * 创建实体多边形，贴地
 * @param {*} _viewer 
 * @param {*} name 
 * @param {*} infos 
 */
export let drawEntiityPolygon = (_viewer, name, infos) => {
    let _entities = [];
    try{
        infos.map(info => {
            _entities = _viewer.entities.add({
                id: info.id.toString(),
                name: name,
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArray( info.points ),
                    clampToGround: true,
                    width: 2,
                    material: Cesium.Color.fromCssColorString('#ff0').withAlpha(0.5)
                },
                polygon : {  
                    hierarchy : Cesium.Cartesian3.fromDegreesArray( info.points ),  
                    material : Cesium.Color.RED.withAlpha(0.1), //材质
                }
            });
        });
    }catch (err){
        console.log("drawEntityPoi error: ", err);
    }
    return _entities;
}

/**
 * 删除指定名称的实体
 * @author hejin 2019-9-4
 * @param {*} _viewer 
 * @param {*} name 实体名称
 */
export let removeEntityByName = (_viewer, name) => {
    let entities = _viewer.entities.values.filter(item => { if(item.name === name) return item})
    entities.map( entity => { _viewer.entities.remove(entity) })
}

/**
 * 删除指定类型的实体
 * @author hejin 2020-3-28
 * @param {*} _viewer 
 * @param {*} type 实体类型
 */
export let removeEntityByType = (_viewer, type, callback) => {
    let entities = _viewer.entities.values.filter(item => { if(item.type === type) return item})
    entities.map( entity => { _viewer.entities.remove(entity) })
    typeof callback === 'function' && callback(); // ostring.call(callback) === '[object Function]'
}

/**
 * 显示指定名称的实体
 * @author hejin 2020-04-08
 * @param {*} _viewer 
 * @param {*} name 实体名称
 */
export let showEntityByName = (_viewer, name) => {
    let entities = _viewer.entities.values.filter(item => { if(item.name === name) return item})
    entities.map( entity => { entity.show = true; })
}

/**
 * 隐藏指定名称的实体
 * @author hejin 2020-04-08
 * @param {*} _viewer 
 * @param {*} name 实体名称
 */
export let hidEntityByName = (_viewer, name) => {
    let entities = _viewer.entities.values.filter(item => { if(item.name === name) return item})
    entities.map( entity => { entity.show = false; })
}

/**
 * 画一个贴地的圆
 * @author hejin 2019-9-4
 * @param {*} _viewer 
 * @param {*} name 实体名称
 */
export let drawCircle = (_viewer, _id, lng, lat, radius=1000) => {
    let circle= _viewer.entities.add({
        name: _id+'circle',
        position: Cesium.Cartesian3.fromDegrees(lng, lat),
        ellipse: {
            semiMinorAxis :  radius,  
            semiMajorAxis : radius,
            material : Cesium.Color.RED.withAlpha(0.1),
        }
    });
    return circle;
}

/**
 * 三维相机定位
 * @param { project } param 
 */
export function goAngleView (_viewer, param) {
    _viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(parseFloat(param.longitude), parseFloat(param.latitude), parseFloat(param.height)),
        orientation: {
            heading : Cesium.Math.toRadians(parseFloat(param.heading)), // east, default value is 0.0 (north)
            pitch : Cesium.Math.toRadians(param.pitch),    // default value (looking down)
            roll : param.roll                           // default value
        },
        duration: 3
    });
}

/**
 * 定位点，三秒飞行时间
 * @param {*} lng  经度
 * @param {*} loat 纬度
 * @param {*} height 高度
 * @param {*} distance 相机查看点的距离
 */
let flyTmp = null;
export let lookAndFlyPoint = (_viewer, lng, lat, height, distance, pitch=-25) => {
    if(flyTmp){
        _viewer.entities.remove(flyTmp);
    }
    var circleSize = 50;
    var sStartFlog=false;
    setTimeout(function () {
        sStartFlog=true;
    },300);
    var s1=0.001,s2=s1;
    var rotation = Cesium.Math.toRadians(30);
    function getRotationValue() {
        rotation += 0.1;
        return rotation;
    }
    flyTmp = new Cesium.Entity({
        id : 'flyTmp',
        position : Cesium.Cartesian3.fromDegrees(lng, lat, height),
        point : {
            pixelSize : 1,
            color : Cesium.Color.WHITE.withAlpha(0.1),
            outlineColor : Cesium.Color.WHITE.withAlpha(0),
            outlineWidth : 1
        },
        // ellipse : {
        //     // semiMinorAxis: circleSize, //直接这个大小 会有一个闪白的材质 因为cesium材质默认是白色 所以我们先将大小设置为0
        //     // semiMajorAxis: circleSize,
        //     semiMinorAxis:new Cesium.CallbackProperty(function () {
        //         if(sStartFlog){
        //             s1=s1+circleSize/20;
        //             if(s1>=circleSize){
        //                 s1=circleSize;
        //             }
        //         }
        //         return s1;
        //     },false),
        //     semiMajorAxis:new Cesium.CallbackProperty(function () {
        //         if(sStartFlog) {
        //             s2 = s2 + circleSize / 20;
        //             if (s2 >= circleSize) {
        //                 s2 = circleSize;
        //             }
        //         }
        //         return s2;
        //     },false),
        //     material:"static/images/circle2.png",
        //     rotation: new Cesium.CallbackProperty(getRotationValue, false),
        //     stRotation: new Cesium.CallbackProperty(getRotationValue, false),
        //     // fill : Cesium.Color.WHITE.withAlpha(0.5),
        //     zIndex:2,
        // }
    });
    _viewer.entities.add(flyTmp);
    _viewer.flyTo(flyTmp, {
        offset : {
            heading : Cesium.Math.toRadians(0.0),
            pitch : Cesium.Math.toRadians(pitch),
            range : distance
        }
    });
    return flyTmp;
}

/**
 * 定位实体，三秒飞行时间
 * @param {*} lng  经度
 * @param {*} loat 纬度
 * @param {*} height 高度
 * @param {*} distance 相机查看点的距离
 */
export let lookAndFlyEntity = (_viewer, entity) => {
    _viewer.flyTo(entity, {
        offset : {
            heading : Cesium.Math.toRadians(0.0),
            pitch : Cesium.Math.toRadians(-25),
            range : 0
        }
    });
}

/**
 * 名称定位实体，三秒飞行时间
 * @param {*} lng  经度
 * @param {*} loat 纬度
 * @param {*} height 高度
 * @param {*} distance 相机查看点的距离
 */
export let lookAndFlyEntityOfName = (_viewer, eName) => {
    let entities = _viewer.entities.values;
    entities.map(entity => {
        if(entity.name === eName){
            //世界坐标转(笛卡尔坐标)换为经纬度
            var ellipsoid=_viewer.scene.globe.ellipsoid;
            // var cartesian3=new Cesium.cartesian3(x,y,z);//世界坐标/笛卡尔坐标
            var cartographic=ellipsoid.cartesianToCartographic(entity.position._value);
            var lat=Cesium.Math.toDegrees(cartographic.latitude);//cartograhphic.latitude(弧度)并非我们想要的  转化后的才是我们想要的（经纬度），
            var lng=Cesium.Math.toDegrees(cartographic.longitude);
            var height=cartographic.height;
            lookAndFlyPoint(_viewer, lng, lat, height, 2000);
        }
    })
}

/**
 * 通过经纬度获得地形高度
 * @author hejin 2019-11-26
 * @param {[Cesium.Cartographic.fromDegrees(87.0, 28.0)]} points 
 */
let terrainProvider = undefined;
export let getTerrainHeight = (points) => {
    if(terrainProvider === undefined){
        terrainProvider = new Cesium.CesiumTerrainProvider({
            url: Cesium.IonResource.fromAssetId(1),
            requestVertexNormals: true,
            baseLayerPicker : false
        })
    }
    var promise = Cesium.sampleTerrainMostDetailed(terrainProvider, points);
    Cesium.when(promise, (updatedPositions) => { 
        return updatedPositions;
    });
}

/**
 * 地球自转展示
 * @param { object } _viewer 
 * @param { boolean } maxHeight 自转高度
 */
export let earthRotation =(_viewer, maxHeight)=>{
    let height = maxHeight;
    var i = Date.now();
    function rotate() {
        if(height < maxHeight) { return; }
        var a = .05;
        var t = Date.now();
        var n = (t - i) / 1e3;
        i = t;
        _viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -a * n);
        // console.log("clock:", t);
    }
    _viewer.clock.onTick.addEventListener(rotate);
    // //  监听鼠标，当高度小于多少的时候 取消自转
    // var handler = new Cesium.ScreenSpaceEventHandler(_viewer.scene.canvas);
    // handler.setInputAction(function(wheelment) {
    //     var height =Math.ceil(_viewer.camera.positionCartographic.height);//取整数
    //     if(height<maxHeight){
    //         _viewer.clock.onTick.removeEventListener(rotate);
    //     }else{
    //         _viewer.clock.onTick.addEventListener(rotate);
    //     }
    // }, Cesium.ScreenSpaceEventType.WHEEL);

    //监听视角变化，来判断
    _viewer.scene.camera.changed.addEventListener(() => {
        height =Math.ceil(_viewer.camera.positionCartographic.height);//取整数
        if(height<maxHeight){
            _viewer.clock.onTick.removeEventListener(rotate);
        }else{
            _viewer.clock.onTick.addEventListener(rotate);
        }
    });//监听视角移动/变化
}

/**
 * 
 * @param {*} _viewer
 * @param {*} url json数据本地地址
 * @param {*} names 需要显示数据源的名称列表
 * @example
    drawJsonArea("static/json/china/beijing.json", ['大兴区']).then((entities) => {
        console.log('drawJsonArea: ', entities);
    });
 */
export let drawJsonArea = (_viewer, url, names=[]) => {
    return new Promise((resovle, reject) => {
        let promise = Cesium.GeoJsonDataSource.load(url, {
            fill: new Cesium.Color(76 / 255, 171 / 255, 206 / 255, 0.05),
            stroke: new Cesium.Color(76 / 255, 171 / 255, 207 / 255, 1),
            strokeWidth: 5
        });
        promise.then(function(dataSource) {
            let ds = new Cesium.GeoJsonDataSource('areaPolygon')
            _viewer.dataSources.add(ds);

            let time = new Cesium.JulianDate()
            let entities = dataSource.entities.values;
            entities.map(entity => {
                let properties = entity.properties.getValue(time);
                let entityName = properties.hasOwnProperty('Name') ? properties.Name : properties.name;
                if(names.length === 0){
                    entity.name = entityName;
                    ds.entities.add(entity);
                } else if(names.indexOf(entityName) !== -1){
                    entity.name = entityName;
                    ds.entities.add(entity);
                }
            })
            resovle(ds.entities);
        });
    })
}

export let HDdrawJsonArea = (_viewer, url, names=[],color,distanceDisplayCondition) => {
   
    return new Promise((resovle, reject) => {
        
        let promise = Cesium.GeoJsonDataSource.load(url, {
            fill: color.fill,
            stroke: color.stroke,
            strokeWidth: 5
        });
        promise.then(function(dataSource) {
            let ds = new Cesium.GeoJsonDataSource('areaPolygon')
            _viewer.dataSources.add(ds);

            let time = new Cesium.JulianDate()
            let entities = dataSource.entities.values;
            entities.map(entity => {
                var position=new Cesium.Cartesian3.fromDegrees(entity.properties.POINT_X.getValue(),entity.properties.POINT_Y.getValue(),20);
                var label={
                    text: entity.name,
                    font: "10px Helvetica",
                    fillColor: Cesium.Color.SKYBLUE,
                    distanceDisplayCondition:distanceDisplayCondition,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                }
                entity.position=position;
                entity.label=label;

                let properties = entity.properties.getValue(time);
                let entityName = properties.hasOwnProperty('Name') ? properties.Name : properties.name;
                if(names.length === 0){
                    entity.name = entityName;
                    ds.entities.add(entity);
                } else if(names.indexOf(entityName) !== -1){
                    entity.name = entityName;
                    ds.entities.add(entity);
                }
            })
            resovle(ds.entities);
        });
    })
}

export let getCamersPosition = (_viewer) => {
    let sObj = {};
    let pos = _viewer.scene.camera.position;
    sObj.x = pos.x;
    sObj.y = pos.y;
    sObj.z = pos.z;
    pos = _viewer.scene.camera.positionCartographic;
    sObj.longitude = pos.longitude * 180 / Math.PI;
    sObj.latitude = pos.latitude * 180 / Math.PI;
    sObj.height = pos.height;
    pos = _viewer.scene.camera;
    sObj.heading = pos.heading * 180 / Math.PI;
    sObj.pitch = pos.pitch * 180 / Math.PI;
    sObj.roll = pos.roll * 180 / Math.PI;
    return sObj;
};

export let fromScreenToMap = (_viewer, x, y) => {
    var pick1= new Cesium.Cartesian2(x, y);
    var cartesian = _viewer.scene.globe.pick(_viewer.camera.getPickRay(pick1), _viewer.scene);
    var ellipsoid = _viewer.scene.globe.ellipsoid;
    var cartographic=ellipsoid.cartesianToCartographic(cartesian);
    var lat=Cesium.Math.toDegrees(cartographic.latitude);
    var lng=Cesium.Math.toDegrees(cartographic.longitude);
    var alt=cartographic.height;
    return {latitude: lat, longitude: lng, height: alt}
};


/**
 * 添加css3 html元素
 * @param app
 * @param elements
 * @param isBackHide
 * @constructor
 */
export let Css3Renderer = function(_viewer, elements, isBackHide) {
    const scratch = new Cesium.Cartesian2()
    const scene = _viewer.scene
    const camera = _viewer.camera
    const that = this;
    that.container = null
    that.elements = elements
    that.isBackHide =  isBackHide
    this.init = function () {
        const _container = document.createElement('div')
        _container.className = `ys-css3-container`
        document.body.appendChild(_container)
        that.container = _container
        that.elements.forEach(e => {
            _container.insertAdjacentHTML('beforeend', e.element);
        })
        scene.preRender.addEventListener(function() {
            for (let i = 0; i < that.container.children.length; i++) {
                const p = Cesium.Cartesian3.fromDegrees(that.elements[i].position[0],that.elements[i].position[1], that.elements[i].position[2] || 0)
                const canvasPosition = scene.cartesianToCanvasCoordinates(p, scratch)
                if (Cesium.defined(canvasPosition)) {
                    that.container.children[i].style.left = parseFloat(canvasPosition.x) + parseFloat( that.elements[i].offset[0]) + 'px'
                    that.container.children[i].style.top =  parseFloat(canvasPosition.y) +  parseFloat( that.elements[i].offset[1]) + 'px'
                    if(that.isBackHide){
                        let j = camera.position, n = scene.globe.ellipsoid.cartesianToCartographic(j).height;
                        if (!(n += 1 * scene.globe.ellipsoid.maximumRadius, Cesium.Cartesian3.distance(j, p) > n)) {
                            that.container.children[i].style.display = 'block'
                        } else {
                            that.container.children[i].style.display = 'none'
                        }
                    }
                }
            }
        })
    }
    this.remove = function (id) {
        that.elements = that.elements.filter(e => e.id !== id )
        if(that.container.children.hasOwnProperty(id)){
            that.container.removeChild(that.container.children[id])
        }
    }
    this.append = function (object) {
        that.elements.push(object)
        that.container.insertAdjacentHTML('beforeend', object.element)
    }
    this.removeEntityLayer = function (id) {
        _viewer.entities.removeById(id+"_1")
        _viewer.entities.removeById(id+"_2")
        _viewer.entities.removeById(id+"_3")
        that.remove(id)
    }
    this.addEntityLayer = function (object) {
        let lon = object.position[0],
            lat = object.position[1],
            sStartFlog = false,
            that = this,
            s1 = 0.001,
            s2 = s1,
            s3 = s1,
            s4 = s1
        setTimeout(() => sStartFlog = true,300)
        let rotation = Cesium.Math.toRadians(30);
        let rotation2 = Cesium.Math.toRadians(30);

        //构建entity
        let height = object.boxHeight,heightMax = object.boxHeightMax,heightDif = object.boxHeightDif;
        let goflog = true
        //添加正方体
        _viewer.entities.add({
            id: object.id + "_1",
            name: "立方体盒子",
            position: new Cesium.CallbackProperty(function () {
                height = height + heightDif;
                if(height >= heightMax){
                    height = heightMax
                }
                return Cesium.Cartesian3.fromDegrees(lon,lat,height/2)
            },false),
            box: {
                dimensions:  new Cesium.CallbackProperty(function () {
                    height = height + heightDif
                    if(height >= heightMax){
                        height = heightMax
                        if( goflog ){ //需要增加判断 不然它会一直执行; 导致对div的dom操作 会一直重复
                            goflog = false
                            that.append(object,true)
                        }
                    }
                    return  new Cesium.Cartesian3(object.boxSide,object.boxSide, height)
                },false),
                material: object.boxMaterial
            }
        });
        //添加底座一 外环
        _viewer.entities.add({
            id: object.id+"_2",
            name: "椭圆",
            position:  Cesium.Cartesian3.fromDegrees(lon,lat),
            ellipse: {
                // semiMinorAxis : object.circleSize, //直接这个大小 会有一个闪白的材质 因为cesium材质默认是白色 所以我们先将大小设置为0
                // semiMajorAxis : object.circleSize,
                semiMinorAxis:new Cesium.CallbackProperty(function () {
                    if(sStartFlog){
                        s1 = s1 + object.circleSize / 20;
                        if(s1 >= object.circleSize){
                            s1 = object.circleSize;
                        }
                    }
                    return s1;
                },false),
                semiMajorAxis:new Cesium.CallbackProperty(function () {
                    if(sStartFlog) {
                        s2 = s2 + object.circleSize / 20;
                        if (s2 >= object.circleSize) {
                            s2 = object.circleSize
                        }
                    }
                    return s2;
                },false),
                material: "../../plugins/ysCesium/images/circle2.png",
                rotation: new Cesium.CallbackProperty(function () {
                    rotation += 0.05;
                    return rotation;
                }, false),
                stRotation: new Cesium.CallbackProperty(function () {
                    rotation += 0.05;
                    return rotation;
                }, false),
                zIndex: 2,
            }
        });
        //添加底座二 内环
        _viewer.entities.add({
            id:object.id+"_3",
            name:"椭圆",
            position :  Cesium.Cartesian3.fromDegrees(lon,lat),
            ellipse : {
                semiMinorAxis:new Cesium.CallbackProperty(function () {
                    if(sStartFlog){
                        s3=s3+object.circleSize/20;
                        if(s3>=object.circleSize/2){
                            s3=object.circleSize/2;
                        }}
                    return s3;
                },false),
                semiMajorAxis:new Cesium.CallbackProperty(function () {
                    if( sStartFlog ) {
                        s4 = s4 + object.circleSize / 20;
                        if (s4 >= object.circleSize / 2) {
                            s4 = object.circleSize / 2;
                        }
                    }
                    return s4;
                },false),
                material:"../../plugins/ysCesium/images/circle1.png",
                rotation: new Cesium.CallbackProperty(function () {
                    rotation2 -= 0.03
                    return rotation2
                }, false),
                stRotation: new Cesium.CallbackProperty(function () {
                    rotation2 -= 0.03
                    return rotation2
                }, false),
                zIndex: 3
            }
        })
    }
    this.init()
}


/**
 * 俯视
 * @author hejin 2019-10-18
 */
export let overlookViewer = (_viewer) => {
    let camOper = getCamersPosition(_viewer);
    let distance = Math.tan(45) * camOper.height;
    
    let earth = document.getElementById("earth");
    let ew = earth.clientWidth || earth.offsetWidth;
    let eh = earth.clientHeight || earth.offsetHeight;
    
    let pick1= new Cesium.Cartesian2( ew/2, eh/2);
    let cartesian = _viewer.scene.globe.pick(_viewer.camera.getPickRay(pick1),_viewer.scene);
    let ellipsoid=_viewer.scene.globe.ellipsoid;
    let cartesian3=new Cesium.Cartesian3(cartesian.x, cartesian.y, cartesian.z);
    let cartographic=ellipsoid.cartesianToCartographic(cartesian3);
    let lat=Cesium.Math.toDegrees(cartographic.latitude);
    let lng=Cesium.Math.toDegrees(cartographic.longitude);
    let height = cartographic.height;
    lookAndFlyPoint(_viewer, lng, lat, height, distance);
}

/**
 * 顶视
 * @author hejin 2019-10-16
 */
export let topViewer = (_viewer) =>{
    let c = getCamersPosition(_viewer);

    let earth = document.getElementById("earth");
    let ew = earth.clientWidth || earth.offsetWidth;
    let eh = earth.clientHeight || earth.offsetHeight;
    
    let pick1= new Cesium.Cartesian2( ew/2, eh/2);
    let cartesian = _viewer.scene.globe.pick(_viewer.camera.getPickRay(pick1), _viewer.scene);

    let ellipsoid=_viewer.scene.globe.ellipsoid;
    let cartesian3=new Cesium.Cartesian3(cartesian.x, cartesian.y, cartesian.z);
    let cartographic=ellipsoid.cartesianToCartographic(cartesian3);
    let lat=Cesium.Math.toDegrees(cartographic.latitude);
    let lng=Cesium.Math.toDegrees(cartographic.longitude);

    let info = {
        longitude: lng,
        latitude: lat,
        height: c.height,
        heading: 0,
        heading: 0,
        pitch: -90,
        roll: 0
    }
    goAngleView(_viewer, info);
}
