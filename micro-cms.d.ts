/* eslint-disable unused-imports/no-unused-vars */
namespace MicroCMS {
  type About = {
    profile: string;
  };

  type TopIllustration = {
    image: {
      height: number;
      url: string;
      width: number;
    };
    objectPosition: string;
  };

  type Illustration = {
    fieldId: string;
    image: {
      height: number;
      url: string;
      width: number;
    };
  };

  type Work = {
    description: string;
    illustrations: Illustration[];
    title: string;
  };
}
