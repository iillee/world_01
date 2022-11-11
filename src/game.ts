import * as utils from '@dcl/ecs-scene-utils'

//Material 00 - White
const material00 = new Material()
      material00.albedoColor = Color3.White()
      material00.metallic = 0
      material00.roughness = .5

//Material 01 - Cycles white
const material01 = new Material()
      material01.albedoColor = Color3.White()
      material01.metallic = 0
      material01.roughness = 1

      class ColorSystem1 {
                  fraction:number = 0
                  direction: number = 1

                  update(dt:number){
                      this.fraction += this.direction * dt * 0.25
                      if(this.fraction > 1){
                          this.fraction = 1
                          this.direction = -1

                      } else if(this.fraction < 0){
                        this.fraction = 0
                        this.direction = 1

                    }
                      material01.albedoColor = Color4.Lerp(new Color4(3, 3, 3, 1), new Color4(1.5, 1.5, 1.5, .5), this.fraction)
                  }
              }
engine.addSystem(new ColorSystem1())

//sounds
const sound01 = new AudioClip("sounds/button.mp3")
const click = new AudioSource(sound01)

//Constant - Ground Plane
const ground = new Entity()
ground.addComponent(new PlaneShape())
ground.addComponent(material00)
ground.addComponent(
      new Transform({
        position: new Vector3(152, 0, 152),
        scale: new Vector3(304, 304, 1),
        rotation: Quaternion.Euler(90, 90, 0)
    }))
engine.addEntity(ground)

//Constant - orb (trigger signifyer)
const orb = new Entity()
orb.addComponent(new SphereShape())
orb.getComponent(SphereShape).withCollisions = false
orb.addComponent(material01)
orb.addComponent(new Transform({
        position: new Vector3(152, 4, 152),
        scale: new Vector3(.5, .5, .5)
}))
engine.addEntity(orb)

// Constant - base
let base = new Entity()
let basePath:string = "models/base.glb"
    base.addComponent(new GLTFShape(basePath))
    base.addComponent(new Transform({
        position: new Vector3(160, 0, 144),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(0, 90, 0)
}))
engine.addEntity(base)

//Channel 01 - Parent
let channel_01 = new Entity()
    channel_01.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_04),
            engine.addEntity(channel_01)
      })
    )

        //Channel Trigger 01
        const trigger_01 = new Entity()
        trigger_01.addComponent(new PlaneShape())
        trigger_01.getComponent(PlaneShape).withCollisions = false
        trigger_01.getComponent(PlaneShape).visible = false
        trigger_01.addComponent(material00)
        trigger_01.addComponent(click)
        trigger_01.addComponent(new Transform({
          position: new Vector3(152, 6.25, 152),
          scale: new Vector3(1, 1, 1),
          rotation: Quaternion.Euler(90, 0, 0)
        }))
        let triggerBox01 = new utils.TriggerBoxShape()
        trigger_01.addComponent(
          new utils.TriggerComponent(
            triggerBox01,
          {
            onCameraExit :() => {
              log('triggered!')
              channel_02.getComponent(utils.ToggleComponent).toggle()}
        }))
        click.playing = true

        //pavillion
        let pavillion = new Entity()
        let pavillionPath:string = "models/pavillion.glb"
            pavillion.addComponent(new GLTFShape(pavillionPath))
            pavillion.addComponent(new Transform({
                position: new Vector3(144, 0, 144),
                scale: new Vector3(1, 1, 1),
                rotation: Quaternion.Euler(0, 180, 0)
        }))

        //Pre Load main models of each channel in the channel before it scaled to zero. Models always load faster the second time around.

        //preload_01
        let preload_01 = new Entity()
        let preload_01Path:string = "models/topo.glb"
            preload_01.addComponent(new GLTFShape(preload_01Path))
            preload_01.addComponent(new Transform({
                position: new Vector3(0, 0, 0),
                scale: new Vector3(0, 0, 0),
                rotation: Quaternion.Euler(0, 270, 0)
        }))

//Set parent
trigger_01.setParent(channel_01)
pavillion.setParent(channel_01)
preload_01.setParent(channel_01)

//specify start state to run when the scene begins. move/change this line of code to change the starting channel.
engine.addEntity(channel_01)

//Channel 02 - Parent
let channel_02 = new Entity()
    channel_02.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_01),
            engine.addEntity(channel_02)
      })
    )

      //Channel Trigger 02
      const trigger_02 = new Entity()
      trigger_02.addComponent(new PlaneShape())
      trigger_02.getComponent(PlaneShape).withCollisions = false
      trigger_02.getComponent(PlaneShape).visible = false
      trigger_02.addComponent(material00)
      trigger_02.addComponent(click)
      trigger_02.addComponent(new Transform({
        position: new Vector3(152, 6.25, 152),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox02 = new utils.TriggerBoxShape()
      trigger_02.addComponent(
        new utils.TriggerComponent(
          triggerBox02,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_03.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //landscape
      let landscape = new Entity()
      let landscapePath:string = "models/topo.glb"
          landscape.addComponent(new GLTFShape(landscapePath))
          landscape.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

      //preload_02
      let preload_02 = new Entity()
      let preload_02Path:string = "models/coliseum.glb"
          preload_02.addComponent(new GLTFShape(preload_02Path))
          preload_02.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(0, 0, 0),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

//Set parent
trigger_02.setParent(channel_02)
landscape.setParent(channel_02)
preload_02.setParent(channel_02)

//Channel 03 - Parent
let channel_03 = new Entity()
    channel_03.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_02),
            engine.addEntity(channel_03)
      })
    )

      //Channel Trigger 03
      const trigger_03 = new Entity()
      trigger_03.addComponent(new PlaneShape())
      trigger_03.getComponent(PlaneShape).withCollisions = false
      trigger_03.getComponent(PlaneShape).visible = false
      trigger_03.addComponent(material00)
      trigger_03.addComponent(click)
      trigger_03.addComponent(new Transform({
        position: new Vector3(152, 6.25, 152),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox03 = new utils.TriggerBoxShape()
      trigger_03.addComponent(
        new utils.TriggerComponent(
          triggerBox03,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_04.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //coliseum
      let coliseum = new Entity()
      let coliseumPath:string = "models/coliseum.glb"
          coliseum.addComponent(new GLTFShape(coliseumPath))
          coliseum.addComponent(new Transform({
              position: new Vector3(152, 0, 152),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

      //preload_03
      let preload_03 = new Entity()
      let preload_03Path:string = "models/portfolio.glb"
          preload_03.addComponent(new GLTFShape(preload_03Path))
          preload_03.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(0, 0, 0),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

//Set parent
trigger_03.setParent(channel_03)
coliseum.setParent(channel_03)
preload_03.setParent(channel_03)

//Channel 04 - Parent
let channel_04 = new Entity()
    channel_04.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_03),
            engine.addEntity(channel_04)
      })
    )

      //Channel Trigger 04
      const trigger_04 = new Entity()
      trigger_04.addComponent(new PlaneShape())
      trigger_04.getComponent(PlaneShape).withCollisions = false
      trigger_04.getComponent(PlaneShape).visible = false
      trigger_04.addComponent(material00)
      trigger_04.addComponent(click)
      trigger_04.addComponent(new Transform({
        position: new Vector3(152, 6.25, 152),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox04 = new utils.TriggerBoxShape()
      trigger_04.addComponent(
        new utils.TriggerComponent(
          triggerBox04,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_01.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //portfolio
      let portfolio = new Entity()
      let portfolioPath:string = "models/portfolio.glb"
          portfolio.addComponent(new GLTFShape(portfolioPath))
          portfolio.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

      //preload_04
      let preload_04 = new Entity()
      let preload_04Path:string = "models/coliseum.glb"
          preload_04.addComponent(new GLTFShape(preload_04Path))
          preload_04.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(0, 0, 0),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

//Set parent
trigger_04.setParent(channel_04)
portfolio.setParent(channel_04)
preload_04.setParent(channel_04)
