import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [CoffeesService],
})
export class CoffeesModule {}

/* 
  Dependecy injection:
  ****basic implementation****
	when we put an array of classes, nest insantiate it for us we can alternatively write:
	{
		provide: CoffeesService,
		useClass: CoffeesService
	}
	***value based providers***
	{
		provide: ConfigService,
		useValue : new CustomConfigService (or new ConfigService, or an already instantiated object)
	}
  ****Non Class based Providers (key vaue)****	
	we can inject string based tokens as follows:
  {
		provide : yourKey,
		useValue: yourValue
	}
	and in the class where you want to inject the value :
	constructor(@Inject(yourKey) varName : varType){}

  ****Class Providers****
	Providing the class conditionally
	{
 		provide : ConfigService //should be a class in this case
		useClass: condition ? DevConfigService : ProdConfigService
	}
 
  ****Factory providers****
   class SomeFactory{}
  {
    provide: someKey,
    useFactory: ()=> SomeFactory.create() ,
    inject: [SomeFactory]
  }
  ***Leverage asynchronous providers****
  when we don't want to accept requests until the database connection is set we leverage async providers:
  {
    provide: someKey,
    useFactory: async (connection: Connection)=> {
      const result = await connection.query('SELECT ....');
      return result;
    },
	  inject: [Connection]
  }

  ***Dynamic Modules***
  1. creating a dynamic module:
  @Module({})
  export class DatabaseModule{
    static register(options: ConnectionOptions): DynamicModule {
        return {
            module:DatabaseModule,
            providers:[
              {
                provide: 'CONNECTION',
                useValue: createConnection(options)
              }
            ]
        }
    }
  }
  2. injecting the module
  imports:[DatabaseModule.register(CONNECTION_OPTIONS)]
   
  ****Providers Scope****
  The default behavior is singleton, same instance of the provider is shared between the app
  ==> You can modify this behavior by adding {scope: Scope.SOMESCOPE} inside @Injectable()
  TRANSIENT: The provider is instanciated whenever injected 
  REQUEST: The provider is instanciated on every request 


*/
